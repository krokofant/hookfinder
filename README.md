Hookfinder for Xposed development
=================================

This module is used to find renamed *methods* and *fields* in decompiled apks.

1. decompile the apk with apktool
2. define a [hookfinder.settings.js](hookfinder.settings.js)
3. run the hookfinder to see which methods match the supplied signatures

# Install
Install hookfinder globally by using `npm install -g hookfinder`


# Usage

## Prerequisites
  * apktool
  * node & npm
  * basic understading of smali

## Example usage
This will produce a report and if some method has several matches you might specify an implementation filter. If there are multiple matches their implementations will be printed to the terminal.
```bash
apktool d base.apk
hookfinder find base
```


# CLI
Run `hookfinder --help` to see this
```
  Usage: cli [options] [command]


  Commands:

    find <base-folder>  search in the specified directory

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -s, --settings <settings-file>  Specify settings
    -v, --verbose                   Show stacktraces
```


# Settings
The settings have two properties `PACKAGE_BASE` which describes the path to the targeted package root and `targets` which descibes the targeted classes and which `fields` and `methods` that are being sought after.
```javascript
  'model.Storage': { // folder 'model' and class 'Storage'
    methods: [ // methods to look for
      {
        name: 'UnlockFeatures', // your description of the method
        // this filter is for the method signature and return type
        // https://github.com/JesusFreke/smali/wiki/TypesMethodsAndFields
        filter: /\.method public (\w+)\(Ljava\/lang\/String;\)Z/g,
        // this filter is for the method implementation
        // here we're loking for any mention of 'features'
        implementationFilter: /features/g
      }
    ]
  },
```
