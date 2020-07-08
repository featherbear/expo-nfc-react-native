> The following instructions document the creation of this repository which was based off a newly created `create-expo-native-app` template.

# Prepare the Repository

* `npx create-expo-native-app` - Deploy the template
* `npm install` - Install the dependencies
* `npm run init` - Initialise the template

The template repository is quite unpolished, with many development artifacts left behind that should have been gitignored.  
Here are a list of files which you should be able to safely add to your `.gitignore` file.  
_Also remember to remove it from the git cache (`git rm --cached FILE`)_

* `.expo/packager-info.json`
* `android/local.properties`
* `app.json`
* `config.json`

# Prepare the Build Environment

You should now be able to install the Gradle build environment and its dependencies.  

Ensure you have a Java JDK installed, and have your Android SDK tool license agreements accepted.  
_You can accept all licenses with `yes | sdkmanager --licenses`_

Firstly, ensure you have a phone connected via ADB, or a Virtual Device prepared.

* `cd android && ./gradlew installDebug`

After the build environment is ready, open the `android` folder in Android Studio.  

You should be able to execute the Run command to build and install the application onto your device

Now check that `npm run android-native` and `npm run android-expo` work.

# Install the native NFC module

I ran these commands to get the native NFC module working

* `npm install featherbear/react-native-mifare-classic-wrapper` - Install the NFC wrapper library
* `react-native link react-native-nfc-manager` - Link library files
* `npm install jetifier` - Install compatibility tool for non-AndroidX libraries
* `npx jetifier` - Let Jetifier do its magic
* Enable Jetifier and AndroidX in `android/gradle.properties`
* _Rebuild the application in Android Studio_
