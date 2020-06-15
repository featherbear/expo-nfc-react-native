import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Modal from 'expo-modal'
import MFC, { ByteParser } from 'react-native-mifare-classic-wrapper'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nfcError: 'Please wait...',
      tag: null,
      data: null
    }
  }

  componentDidMount () {
    const tagFound = async (tag) => {
      await tag.readBlock(48, {
        sector: 12,
        key: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        keyType: 'A'
      }).then(d => {
        this.setState({ tag: tag.id, data: ByteParser.byteToString(d) })
      })
    }

    MFC.start().then(() => MFC.listen(tagFound))
      .then(this.setState({ nfcError: null }))
      .catch(e => this.setState({ nfcError: e.message }))

    MFC.onStateChanged(({ state }) => {
      if (state === 'on') {
        this.setState({ nfcError: this.state.oldNfcError, tag: null, data: null })
      } else if (state === 'off') {
        this.setState({
          oldNfcError: this.state.nfcError,
          nfcError: 'NFC Disabled!'
        })
      }
    })
  }

  render () {
    const nfcError = () => <Text>{this.state.nfcError}</Text>
    const noTag = () => <Text> Approach a Mifare Classic Tag </Text>
    const tagDetected = () => (
      <View>
        <Text>ID: {this.state.tag}</Text>
        <Text>Data: {this.state.data}</Text>
      </View>
    )

    return Modal.wrapIntoModal(
      <View style={styles.container}>
        {this.state.nfcError ? nfcError() : ((this.state.tag && this.state.data) ? tagDetected : noTag)()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
