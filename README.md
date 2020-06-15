Using Expo with react-native-nfc-manager
---

[react-native-nfc-manager]: https://github.com/whitedogg13/react-native-nfc-manager
[Expo]: https://expo.io/

> This repository features how to use [react-native-nfc-manager] whilst also maintaining the ability to develop with the [Expo] framework.

* The code has been adapted from this [article](https://codersera.com/blog/running-expo-react-native-together/)
* This project uses a [custom wrapper](https://github.com/featherbear/react-native-mifare-classic-wrapper) over the [react-native-nfc-manager] library, however usage is the same.

# General Overview

[Expo] is a framework for React Native which provides a set of tools and services to allow us to develop React Native applications. Unfortunately, it does support third-party React Native Modules, meaning that you would have to forego using [Expo] if you want to use these third-party modules... usually.

The `create-expo-native-app` npx template provides a set of scripts that allow us to use both React Native Modules and [Expo] at the same time! By creating stubs/mocks, we can make the Babel transpiler use different pieces of code depending on whether the application is running in Native mode, or with Expo.  

When running on Expo mode, these stubs/mocks will emulate the behaviour of the React Native Module.  
When running on Native mode, the actual React Native Module will be used.  

# Installation and Development

> These instructions are for the Android environment. For iOS, please look at the original [article](https://codersera.com/blog/running-expo-react-native-together/).

When running in native / "ejected mode", the platform-specific builds will need to be installed (i.e. X Code and/or Android Studio). For Android, this means we will have to set up `adb`, `gradle`, etc...

Adding in new libraries would require you to rebuild the application in Android Studio, and deploy them onto your device / emulated device. Actual application development is however is still performed as usual (Metro bundler)

> The following instructions are based off a newly created `create-expo-native-app` template.

## Set up the Android environment

* Delete `android/local.properties`
* Git ignore `android/local.properties`
* `npm install`
* `npm run init`
* Remove `app.json` from the git index
* `cd android && ./gradlew installDebug`
* _Open the `android` folder in Android Studio_
* _Check that `npm run android-native` works_
* _Check that `npm run android-expo` works_

## Install the native NFC module

* `npm install featherbear/react-native-mifare-classic-wrapper`
* `react-native link react-native-nfc-manager`
* `npm install jetifier`
* `npx jetifier`
* Enable Jetifier and AndroidX in `android/gradle.properties`
* _Rebuild the application in Android Studio_

## Stub/Mock File

* TODO!