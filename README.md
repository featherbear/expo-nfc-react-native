Using Expo with react-native-nfc-manager
---

[react-native-nfc-manager]: https://github.com/whitedogg13/react-native-nfc-manager
[Expo]: https://expo.io/

> This repository features how to use [react-native-nfc-manager] whilst also maintaining the ability to develop with the [Expo] framework.

* The code has been adapted from this [article](https://codersera.com/blog/running-expo-react-native-together/)
* This project uses a [custom wrapper](https://github.com/featherbear/react-native-mifare-classic-wrapper) over the [react-native-nfc-manager] library, however usage is the same.

# General Overview

[Expo] is a framework for React Native which provides a set of tools and services to allow us to develop React Native applications. Unfortunately, it does support third-party React Native Modules, meaning that you would have to forego using [Expo] if you want to use these third-party modules... usually.

The `create-expo-native-app` npx template provides a set of scripts that allow us to use both React Native Modules and [Expo] at the same time! By creating stub files, we can make the Babel transpiler use different pieces of code depending on whether the application is running in Native mode, or with Expo.  

When running on Expo mode, these stubs will emulate the behaviour of the React Native Module.  
When running on Native mode, the actual React Native Module will be used.  

# Getting Started

You can have a look at the documented steps that I made [here](./INITIAL.md)

This repository was developed with the Android environment in mind. For iOS, please look at the original [article](https://codersera.com/blog/running-expo-react-native-together/).

When running in native / "ejected mode", the platform-specific builds will need to be installed (i.e. X Code and/or Android Studio). For Android, this means we will have to set up `adb`, `gradle`, etc...

Adding in new libraries would require you to rebuild the application in Android Studio, and deploy them onto your device / emulated device. Actual application development (your React code) is however is still performed as usual (automatic packaging with the Metro bundler)

## Stub File

A stub version can be written to emulate/handle a native module's functionality.  
Whilst native modules won't work in Expo, you will still be able to develop your application using Expo; with emulated module functionality.

Have a look at the `stubs/MifareClassicWrapperStub.js` and `babel.config.js` file for an example of how to set this up.
