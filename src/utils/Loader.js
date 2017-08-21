import cheerio from 'cheerio-without-node-native'

import md5 from './md5'
import CONSTANTS from '../constants'

export default class Loader {
  static async getCatalog() {
    try {
      const response = await fetch('http://www.wuxiaworld.com')
      const html = await response.text()
      const $ = cheerio.load(html)
      let catalog = {}
      $('#menu-home-menu').children((i, elem) => {
        if (![0, 5, 6, 7].includes(i)) {  // exclude 'home', 'resources', 'forums', 'wiki'
          let category = $(elem).children('a').text()
          catalog[category] = []
          $(elem).children('ul').children().each((i2, e2) => {
            let book = {
              'key': $(e2).children('a').text(),
              'title': $(e2).children('a').text(),
              'url': $(e2).children('a').attr('href')
            }
            catalog[category].push(book)
          })
        }
      })
      return catalog
    } catch(error) {
      console.log(error)
    }
  }

  static async getChapters(url) {
    try {
      const response = await fetch(url)
      const html = await response.text()
      const $ = cheerio.load(html)
      let chapters = []
      $('article a:contains(Chapter)').each((i, elem) => {
        let title = $(elem).text()
        if ($(elem).attr("title")) {
          title = '(' + $(elem).attr("title") + ') ' + title
        }
        let chapter = {
          key: i,
          title: title,
          url: $(elem).attr('href')
        }
        chapters.push(chapter)
      })
      return chapters
    } catch(error) {
      console.log(error)
    }
  }

  static async loadChapter(url) {
    try {
      const response = await fetch(url)
      const html = await response.text()
      const $ = cheerio.load(html)
      let chapter = []
      $('div[itemprop=articleBody] p').each((i, elem) => {
        let paragraph = $(elem).text().split(' ')
        chapter.push({
          key: i,
          paragraph: paragraph
        })
      })
      return chapter
    } catch(error) {
      console.log(error)
    }
  }

  static async loadTranslation(word) {
    try {
      const baseUrl = 'https://openapi.youdao.com/api?'
      const salt = Date.now()
      const sign = md5(CONSTANTS.YD_TRANSLATOR_APP_ID + word + salt + CONSTANTS.YD_TRANSLATOR_APP_KEY)
      const url = baseUrl+'q=' + word + '&from=' + 'en' + '&to=' + 'zh_CHS' + '&appKey=' + CONSTANTS.YD_TRANSLATOR_APP_ID + '&salt=' + salt + '&sign=' + sign
      const response = await fetch(url)
      const data = await response.json()
      let translation = {}
      if (data.basic == undefined) {
        translation['phonetic'] = ''
        translation['definition'] = data.translation.join('\n')
      } else {
        translation['phonetic'] = data.basic.phonetic
        translation['definition'] = data.basic.explains.join('\n')
      }
      return translation
    } catch(error) {
      console.log(error)
    }
  }
}