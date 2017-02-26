import {join} from 'path'

const hooks = require(join(process.cwd(), 'hooks.json'))

export default class Mapper {
  constructor () {
    this.classes = {}
    this.currentClass = null
  }

  fromJson() {
    Object.keys(hooks).forEach(key => {
      if (['version', 'versionCode', 'updateMessage'].includes(key)) { } else if (key.includes('Class')) {
        this.classes[hooks[key]] = {
          hookNameRef: key
        }
        this.currentClass = hooks[key]
      } else {
        this.classes[this.currentClass][key] = hooks[key]
      }
    })
  }
}
