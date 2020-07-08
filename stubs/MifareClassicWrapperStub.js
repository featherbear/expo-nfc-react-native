export default new (class {
  get NfcManager () {
    return null
  }

  async isMFCsupported () {
    return false
  }

  async start () {
    throw new Error('MFC not supported')
  }

  listen (callback) {
    return null
  }

  onStateChanged (listener) {
    return null
  }
})()
