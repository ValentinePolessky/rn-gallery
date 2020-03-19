// @flow
import * as React from 'react'
import DetailView from '../../screens/DetailView'
import {connect} from 'react-redux'
import {ActivityIndicator, Share, Text} from 'react-native'
import {fetchPictureDetails} from './actions'
import {selectHiResImage} from './selectors'

export interface Props {
  navigation: any,
  fetchPictureDetails: Function,
  isLoading: boolean,
  getHiResImage: Function,
  errorMessage: string,
}

export interface State {
  imageUrl: string,
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
  }

  componentDidMount() {
    const {navigation, fetchPictureDetails, isLoading} = this.props
    const {pictureDetails} = navigation.state.params
    if (!this.props.getHiResImage(pictureDetails.id) && !isLoading) {
      fetchPictureDetails(pictureDetails.id)
    }
  }

  share = (imageId: number): void => {
    const image = this.props.getHiResImage(imageId);
    const imageUrl = image.full_picture;
    Share.share({
      message: `Image ${imageUrl}`,
      url: imageUrl,
      title: 'Share image'
    }, {
      dialogTitle: 'Share image',
    })
  }

  applyFilter = (type): void => {
    // TODO: implement apply image filter function
  }

  render() {
    const {pictureDetails} = this.props.navigation.state.params
    const {isLoading, getHiResImage, errorMessage} = this.props
    const hiResImage = getHiResImage(pictureDetails.id)

    if ((isLoading || !hiResImage) && !errorMessage) {
      return <ActivityIndicator size="large" color="#0000ff"/>
    }

    if (errorMessage) {
      return <Text style={{color: 'white'}}>
        {errorMessage}
      </Text>
    }

    return (
      <DetailView
        imageUrl={hiResImage.full_picture}
        pictureDetails={hiResImage}
        shareCallback={this.share}
        isLoading={isLoading}
        applyFilterCallback={this.applyFilter}
        errorMessage={errorMessage}
      />
    )
  }
}

function bindAction(dispatch) {
  return {
    fetchPictureDetails: imageId => dispatch(fetchPictureDetails(imageId)),
  }
}

const mapStateToProps = state => ({
  getHiResImage: imageId => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading,
  errorMessage: state.detailViewReducer.errorMessage,
})

export default connect(mapStateToProps, bindAction)(DetailViewContainer)
