import Hookfinder from './hookfinder'

const args = process.argv.slice(2)

if (args.length < 1) {
  console.error('No base folder provided')
  process.exit()
} else {
  new Hookfinder({
    basefolder: args[0]
  }).start()
}
