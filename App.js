import React from 'react'
import { Video } from 'expo-av'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'expo-modal'
import NfcManager, { ByteParser, NfcTech } from 'react-native-nfc-manager'
import DeviceInfo from 'react-native-device-info'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nfcEnabled: false,
      tag: null
    }
  }

  componentDidMount () {
    NfcManager.isSupported(NfcTech.MifareClassic).then(r => {
      if (!r) return
      // NfcManager.onStateChanged(

      NfcManager.start()
        .then(() => NfcManager.isEnabled())
        .then(nfcEnabled => {
          this.setState({ nfcEnabled })

          if (!nfcEnabled) {
            console.warn('NFC disabled!')
            return
          }

          console.log('Started')
          const listen = () => {
            NfcManager.registerTagEvent()
              .then(() => NfcManager.requestTechnology(NfcTech.MifareClassic))
              .then(() => NfcManager.getTag())
              .then(tag => {
                this.setState({ tag })
                console.log(tag)
              })
              .finally(() => {
                NfcManager.cancelTechnologyRequest()
                listen()
              })
          }

          listen()
        })
    })
  }

  render () {
    const innerComponent = (
      <View
        style={{
          height: height / 2,
          width: width / 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Hello world</Text>
        <TouchableOpacity onPress={() => Modal.dismissModal()}>
          <Text>close modal</Text>
        </TouchableOpacity>
      </View>
    )

    return Modal.wrapIntoModal(
      <View style={styles.container}>
        <Text>{DeviceInfo.getBrand()}</Text>
        {/* <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
          }}
          shouldPlay
          resizeMode='cover'
          style={styles.videoPlayer}
        /> */}
        <TouchableHighlight
          onPress={() => {
            Modal.showModal(innerComponent)
          }}
        >
          <Text> Touch Here </Text>
        </TouchableHighlight>
      </View>,
      styles.modalStyle
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoPlayer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 2
  },
  modalStyle: {
    backgroundColor: 'rgba(1,1,56,0.3)'
  }
})
