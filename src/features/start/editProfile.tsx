import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'

interface Props {

}

interface State {

}

let styles
const { width } = Dimensions.get('window')

export default class Edit extends Component<Props, State> {

  state = {
    modalVisible: false,
    photos: [],
    index: null,
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }

    this.setState({ index })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }


  share = () => {
    const image = this.state.photos[this.state.index].node.image.uri
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
      let shareOptions = {
        title: "React Native Share Example",
        message: "Check out this photo!",
        url: `data:image/jpg;base64,${data}`,
        subject: "Check out this photo!"
      }

      Share.open(shareOptions)
        .then((res) => console.log('res:', res))
        .catch(err => console.log('err', err))
    })
  }

  render() {
    console.log('state: ', this.state)
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={() => { this.toggleModal(); this.getPhotos() }}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}>
              {
                this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      style={{ opacity: i === this.state.index ? 0.5 : 1 }}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
                      <Image
                        style={styles.imageSizer}
                        source={{ uri: p.node.image.uri }}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
            {
              this.state.index !== null && (
                <View style={styles.shareButton}>
                  <Button
                    title='Share'
                    onPress={this.share}
                  />
                </View>
              )
            }
          </View>
        </Modal>
      </View>
    )
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  },
  imageSizer: {
    width: width/3,
    height: width/3,
  },
})