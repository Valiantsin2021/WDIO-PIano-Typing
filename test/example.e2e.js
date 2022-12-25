const browsers = require('../utils/browsers')
const PianoPage = require('./pageobjects/Piano.page')
describe('Playing piano!!!', () => {
  it('should login with valid credentials', async () => {
    await PianoPage.open()
    await PianoPage.acceptCookies()
    await PianoPage.play()
  })
  it(`plays piano on https://pianobynumber.com`, async () => {
    await browser.url('https://pianobynumber.com/pages/online-piano')
    for (let j = 0; j < 4; j++) {
      let str = ''
      str += await $$('div b')[j].getText()
      let arr = str.replaceAll(/[^(\d)]/g, '').split('')
      for (let i = 0; i < arr.length; i++) {
        await $$('div.keyname')[arr[i]].click()
        await browser.pause(50)
      }
    }
  })
})
