// @flow
import * as React from 'react'
import { Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import HomeView from '../../screens/Home'
import { fetchPictures } from './actions'

export interface Props {
  navigation: any,
  fetchPictures: Function,
  pictures: Array<Object>,
  isLoading: boolean,
  errorMessage: string,
  hasMore: boolean,
  page: number,
  onLoadNext: Function,
  onRefresh: Function,
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#000')
  }

  componentDidMount () {
    this.onRefresh()
  }

  onRefresh = (): void => {
    this.props.fetchPictures(1)
  }

  onLoadNext = (): void => {
    const {isLoading, hasMore, page} = this.props;
    if (!isLoading && hasMore) {
      this.props.fetchPictures(page + 1)
    }
  }

  render () {
    return <HomeView {...this.props}
      onRefresh={this.onRefresh}
      onLoadNext={this.onLoadNext} />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictures: page => dispatch(fetchPictures(page)),
  }
}

const mapStateToProps = state => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
  hasMore: state.homeReducer.hasMore,
  errorMessage: state.homeReducer.errorMessage,
})

export default connect(mapStateToProps, bindAction)(HomeContainer)
