// @flow
import * as React from 'react'
import {
  View, Dimensions, Text,
} from 'react-native'

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'
import PhotoView from 'react-native-photo-view';

const {width, height} = Dimensions.get('window')

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
  errorMessage: string,
}

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {
  render() {
    const {imageUrl, shareCallback, applyFilterCallback, pictureDetails, errorMessage} = this.props
    return (
      <View style={styles.container}>
        {errorMessage ? (
          <Text style={{color: 'white'}}>
            {errorMessage}
          </Text>) : (
          <React.Fragment>
            <View style={styles.imageContainer}>
              <PhotoView
                source={{uri: imageUrl}}
                minimumZoomScale={1}
                maximumZoomScale={3}
                androidScaleType="center"
                style={{flex: 1, width: width * 0.9, height: height * 0.9}}/>
            </View>
            <DetailsFooter
              pictureDetails={pictureDetails}
              shareCallback={shareCallback}
              applyFilterCallback={applyFilterCallback}
            />
          </React.Fragment>
        )
        }
      </View>
    )
  }
}

export default DetailView
