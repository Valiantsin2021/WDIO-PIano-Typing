const Page = require('./page')
class PianoPage extends Page {
  get cookiesAcceptBtn() {
    return $('button[mode="primary"]')
  }
  get whiteKeys() {
    return $$('.white-key')
  }
  get blackKeys() {
    return $$('.black-key')
  }
  async acceptCookies() {
    if (await this.cookiesAcceptBtn.isExisting()) {
      await this.cookiesAcceptBtn.click()
    }
    return
  }
  async play() {
    console.log(await this.whiteKeys.length)
    //use for await
    for await (let key of this.whiteKeys) {
      key.click()
      await browser.pause(50)
    }
    console.log(await this.blackKeys.length)
    //use for
    for (let i = 0; i < (await this.blackKeys.length); i++) {
      await this.blackKeys[i].click()
      await browser.pause(50)
    }
  }
  async open() {
    await super.open()
  }
}

module.exports = new PianoPage()
