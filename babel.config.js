let config = {}
try {
  config = require('./config.json')
} catch {}

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          // "root": ["./assets"],
          alias: {
            ...(config.isEjected ? {} : {
              // Add your own stub files here!
              // These files will be loaded in replacement of libraries when running in unejected (i.e. expo) configuration

              'react-native-mifare-classic-wrapper$': './stubs/MifareClassicWrapperStub'
            })
          },
          extensions: ['.ios.js', '.android.js', '.js', '.json']
        }
      ]
    ]
  }
}
