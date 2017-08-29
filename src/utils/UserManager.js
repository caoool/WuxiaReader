import { AsyncStorage } from 'react-native'

export default class UserManager {
  static async isFavorited(url) {
    try {
      const response = await AsyncStorage.getItem(url)
      if (response === null) { return false }
      const book = JSON.parse(response)
      if (!book.user) { return false }
      if (book.user.favorited) { return true }
      return false
    } catch (error) {
      console.log(error)
    }
  }

  static async addToFavorite(book) {
    try {
      const favorited = await this.isFavorited(book.details.url)
      if (favorited) { return false }
      const mod = { user: { favorited: true } }
      await AsyncStorage.mergeItem(book.details.url, JSON.stringify(mod))
      console.log('Added to favorite')
      return true
    } catch (error) {
      console.log(error)
    }
  }

  static async removeFromFavorite(url) {
    try {
      const favorited = await this.isFavorited(url)
      if (!favorited) { return false }
      const mod = { user: { favorited: false } }
      await AsyncStorage.mergeItem(url, JSON.stringify(mod))
      console.log('Removed from favorite')
      return true
    } catch (error) {
      console.log(error)
    }
  }

  static async loadFavorites() {
    try {
      let books = []
      const keys = await AsyncStorage.getAllKeys()
      await Promise.all(keys.map(async key => {
        const response = await AsyncStorage.getItem(key)
        const book = JSON.parse(response)
        if (book.details) {
          let mod = book.details
          mod['key'] = key
          if (book.user && book.user.favorited) { books.push(mod) }
        }
      }))
      return books
    } catch (error) {
      console.log(error)
    }
  }

  static async checkRead(chapterUrl) {
    try {
      const response = await AsyncStorage.getItem(chapterUrl)
      if (response === null) { return false }
      return JSON.parse(response).read
    } catch (error) {
      console.log(error)
    }
  }

  static async chapterRead(bookUrl, chapterUrl, chapterTitle) {
    try {
      const bookMod = {
        user: { lastRead: { title: chapterTitle, url: chapterUrl } } 
      }
      const chapterMod = { read: true }
      await AsyncStorage.mergeItem(bookUrl, JSON.stringify(bookMod))
      await AsyncStorage.mergeItem(chapterUrl, JSON.stringify(chapterMod))
      console.log('Chapter set to read')
    } catch (error) {
      console.log(error)
    }
  }
}