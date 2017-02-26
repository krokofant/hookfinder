import fs from 'fs'
import {join} from 'path'
import {yellow} from 'chalk'

export default class Hookfinder {
  constructor (options = {}) {
    this.targets = options.targets
    this.basefolder = options.basefolder
  }

  async start () {
    const result = await Promise.all(Object.keys(this.targets).map(async classPath => {
      const filePath = join(this.basefolder, classPath.replace(/\./g, '/') + '.smali')
      const source = await this.readFile(filePath)
      const methods = (this.targets[classPath].methods || []).map(method => {
        let implementations = source
                    // match entire method
                    .match(new RegExp(method.filter.source + /(.|\n|\r)*?\.end method/.source, 'g'))
                    // use implementation filter if defined
                    .filter(impl => {
                      if (typeof method.implementationFilter === 'undefined') return true
                      return impl.match(method.implementationFilter) !== null
                    })
        let names = implementations.map(impl => this.getCapture(impl, method.filter))

        return {
          name: method.name,
          matches: names,
          implementations: implementations
        }
      })
      const fields = (this.targets[classPath].fields || []).map(field => {
        let fieldNames = source.match(field.filter)
                    .map(smali => this.getCapture(smali, field.filter))
        return {
          name: field.name,
          matches: fieldNames
        }
      })

      return {
        name: classPath,
        methods,
        fields
      }
    }))
    result.forEach(r => {
      console.log('#', r.name)
      const {methods, fields} = r
      if (methods.length) {
        console.log('## Methods')
        methods.forEach(m => {
          console.log(m.name, '=', m.matches.join(','))
          if (m.matches.length > 1) {
            console.log(yellow(m.implementations.join('\n')))
          }
        })
      }
      if (fields.length) {
        console.log('## Fields')
        fields.forEach(f => console.log(f.name, '=', f.matches.join(',')))
      }
      console.log()
    })
  }

  getCapture (source, regex) {
    return source.match(new RegExp(regex.source))[1]
  }

  readFile (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}
