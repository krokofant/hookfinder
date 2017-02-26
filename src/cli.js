import Hookfinder from './hookfinder'
import Mapper from './mapper'
import { join } from 'path'
import { version } from '../package.json'

const cmd = require('commander')

cmd
  .version(version)
  .option('-s, --settings <settings-file>', 'Specify settings')
  .option('--save <report.json>', 'Save report')
  .option('-v, --verbose', 'Show stacktraces')

cmd
  .command('find <base-folder>')
  .description('search in the specified directory')
  .action((basefolderOpt) => {
    let basefolder, targets
    try {
      const settings = require(join(process.cwd(), cmd.settings || 'hookfinder.settings'))
      basefolder = join(basefolderOpt, settings.PACKAGE_BASE)
      targets = settings.targets
    } catch (err) {
      console.error('Failed to load settings file')
      if (cmd.verbose) console.error(err)
      return
    }
    new Hookfinder({
      basefolder: basefolder,
      targets,
      saveReport: cmd.save
    }).start()
      .catch(err => {
        console.error(err)
      })
  })

cmd
  .command('map <report.json> <hooks.json> <updated-hooks.json>')
  .description('try to map report results to the oddly specific JodelXposed hooks.json format')
  .action(async (reportPath, hooksPath, updatedHooksPath) => {
    try {
      let mapper = new Mapper({
        hooksPath,
        reportPath,
        updatedHooksPath
      })
      await mapper.start()
    } catch (err) {
      console.error(err)
    }
  })

cmd.parse(process.argv)
