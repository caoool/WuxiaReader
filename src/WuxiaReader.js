import { StackNavigator } from 'react-navigation'

import Catalog from './scenes/Catalog'
import Book from './scenes/Book'
import Reader from './scenes/Reader'

const WuxiaReader = StackNavigator({
  Catalog: { screen: Catalog },
  Book: { screen: Book },
  Reader: { screen: Reader }
}, {
  headerMode: 'screen'
})

export default WuxiaReader