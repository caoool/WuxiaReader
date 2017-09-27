import { AsyncStorage } from 'react-native'

import cheerio from 'cheerio-without-node-native'

import md5 from './md5'
import CONSTANTS from '../constants'

export default class Loader {
  static async getCatalog(refresh=false) {
    let catalog = null
    let response = null

    try {
      // fetch from local storage
      if (!refresh) {
        response = await AsyncStorage.getItem('catalog')
        if (response !== null) {
          catalog = await JSON.parse(response)
          console.log('Catalog fetched from local')
          return catalog
        }
      }
      
      // fetch from online
      catalog = { 'All': [] }
      response = await fetch('http://www.wuxiaworld.com')
      const html = await response.text()
      const $ = cheerio.load(html)
      await Promise.all($('#menu-home-menu').children().map(async (i, elem) => {
        if (![0, 5, 6, 7].includes(i)) {  // exclude 'home', 'resources', 'forums', 'wiki'
          let category = $(elem).children('a').text()
          catalog[category] = []
          const _category = $(elem).children('ul').first()
          await Promise.all($(_category).children().map(async (i2, e2) => {
            let book = {
              'key': $(e2).children('a').text(),
              'title': $(e2).children('a').text(),
              'url': $(e2).children('a').attr('href')
            }
            // fetch book details
            const response2 = await fetch(book.url)
            const html2 = await response2.text()
            const $2 = cheerio.load(html2)
            // fetch cover
            const src = $2('main > article img').first().attr('src')
            book['cover'] = { url: src }
            // fetch description
            const description = $2('article p:nth-of-type(2)').text().substring(0, 50) + ' ...'
            book['description'] = description
            // fetch last updated chapter
            const lastChapter = $2('article a:contains(Chapter)').last().text()
            book['lastChapter'] = lastChapter
            // push to catalog
            catalog[category].push(book)
            catalog['All'].push(book)
            console.log('Book fetched online')
          }))
          console.log('Category fetched online')
        }
      }))
      console.log('Catalog fetched from online')
      await AsyncStorage.mergeItem('catalog', JSON.stringify(catalog))
      return catalog
    } catch(error) {
      console.log(error)
    }
  }

  static async loadBook(url, title, refresh=false) {
    let book = null
    let details = null
    let chapters = null
    let response = null

    try {
      if (!refresh) {
        response = await AsyncStorage.getItem(url)
        if (response !== null) {
          book = await JSON.parse(response)
          console.log('Book fetched local')
          return book
        }
      }

      response = await fetch(url)
      const html = await response.text()
      const $ = cheerio.load(html)
      book = {}

      // parse chapters
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
      book['chapters'] = chapters
      console.log('Chapters fetched online')

      // parse details
      details = {
        url: url,
        title: title
      }
      const src = $('main > article img').first().attr('src')
      details['cover'] = { url: src }
      const description = $('article p:nth-of-type(2)').text()
      details['description'] = description
      details['lastChapter'] = chapters[chapters.length-1].title
      book['details'] = details
      console.log('Details fetched online')

      await AsyncStorage.setItem(url, JSON.stringify(book))
      console.log('Book saved')
      return book
    } catch(error) {
      console.log(error)
    }
  }

  static async loadChapter(url) {
    let chapter = null
    let response = null

    try {
      response = await AsyncStorage.getItem(url)
      if (response !== null) {
        chapter = await JSON.parse(response)
        console.log('Chapter fetched local')
        return chapter
      }

      response = await fetch(url)
      const html = await response.text()
      const $ = cheerio.load(html)
      let raw = cheerio.load($('div[itemprop=articleBody]').html())
      raw('p').has('a, img').remove()
      raw('hr').remove()
      let article = raw.html()
      chapter = { content: article, read: true }
      console.log('Chapter fetched online')

      await AsyncStorage.mergeItem(url, JSON.stringify(chapter))
      console.log('Chapter saved')
      return chapter
    } catch(error) {
      console.log(error)
    }
  }

  static async loadNextChapter(bookUrl, chapterUrl, previous=false) {
    let chapters = null
    let response = null
    let index = null

    try {
      response = await AsyncStorage.getItem(bookUrl)
      if (response === null) { return false }
      chapters = JSON.parse(response).chapters
      for (let i in chapters) {
        if (chapters[i].url == chapterUrl) {
          if (previous) index = parseInt(i) - 1
          else index = parseInt(i) + 1
          break
        }
      }
      if (chapters[index]) {
        const chapter = await this.loadChapter(chapters[index].url)
        const ret = {
          url: chapters[index].url,
          title: chapters[index].title,
          chapter: chapter
        }
        return ret
      }
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