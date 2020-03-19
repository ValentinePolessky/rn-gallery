import { StyleSheet } from 'react-native'

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  spinner: {
    position: 'absolute',
  },
  detailView: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    right: 10,
    flexDirection: 'row',
  },
  authorView: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    left: 10,
    flexDirection: 'column',
  },
  authorText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  cameraText: {
    color: 'white',
    fontSize: 16,
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
})
export default styles
