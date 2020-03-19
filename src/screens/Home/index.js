// @flow
import * as React from 'react'
import {
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View, Text,
} from 'react-native'

import ListItem from './components/ListItem'

import styles from './styles'
import { Props } from '../../containers/HomeContainer/index' // use same Props as Main Container

const keyExtractor = (item, page) => item.id.toString() + page

class HomeView extends React.PureComponent<Props> {
  imageThumbnailStylePortrait = null

  constructor (props) {
    super(props)
    this._prepareStyles() // create styles once to avoid object literals and use RN style optimization
  }

  _prepareStyles = (): void => {
    const { height, width } = Dimensions.get('window')
    const realWidth = height > width ? width : height
    const portraitImageSize = realWidth / 2 - 10
    this.imageThumbnailStylePortrait = StyleSheet.flatten({
      width: portraitImageSize,
      height: portraitImageSize,
    })
  }

  _openPicture = (imageId: number): void => {
    const { pictures, navigation } = this.props
    navigation.navigate('DetailView', {
      pictureDetails: pictures.find(pic => pic.id === imageId)
    })
  }

  _renderPicture = (picture) => {
    const imageURL = picture.item.cropped_picture
    const imageId = picture.item.id
    return <ListItem
      imageUrl={imageURL}
      imageId={imageId}
      imageStyle={this.imageThumbnailStylePortrait}
      openPicture={this._openPicture}
    />
  }

  render () {
    const { isLoading, page, pictures, onLoadNext, onRefresh, errorMessage } = this.props

    return <View style={styles.page}>
      {errorMessage ? (
        <Text style={{color: 'white'}}>
          {errorMessage}
        </Text>
      ) : (
        <FlatList
          removeClippedSubviews={true}
          refreshing={isLoading}
          initialNumToRender={20}
          data={pictures}
          onRefresh={onRefresh}
          numColumns={2}
          renderItem={this._renderPicture}
          keyExtractor={(item) => keyExtractor(item, page)}
          onEndReached={onLoadNext}
          onEndThreshold={2}
        />
      )}

    </View>
  }
}

export default HomeView
