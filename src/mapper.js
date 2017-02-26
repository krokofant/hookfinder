import fs from 'fs'
import { join } from 'path'
import json from 'comment-json'
import jsonfile from 'jsonfile'

export default class Mapper {
  constructor (options = {}) {
    this.hooksPath = options.hooksPath
    this.reportPath = options.reportPath
    this.updatedHooksPath = options.updatedHooksPath
  }

  start () {
    try {
      this.report = jsonfile.readFileSync(join(process.cwd(), this.reportPath))
      this.hooks = json.parse(fs.readFileSync(join(process.cwd(), this.hooksPath), 'utf8'))
    } catch (err) {
      console.error('Failed to load json files')
      throw err
    }
    let flat = []
    this.report.forEach(rClass => {
      flat = flat.concat(rClass.methods, rClass.fields)
    })
    flat.forEach(fieldOrMethod => {
      Object.keys(this.hooks)
        .forEach(hooksKey => {
          if (fieldOrMethod.name === hooksKey) {
            console.log('Matched', fieldOrMethod.name)
            if (fieldOrMethod.matches.length > 1) console.warn('Multiple matches for', hooksKey, 'using first')
            this.hooks[hooksKey] = fieldOrMethod.matches[0]
          }
        })
    })
    fs.writeFileSync(join(process.cwd(), this.updatedHooksPath), json.stringify(this.hooks, null, 2))
  }
}
