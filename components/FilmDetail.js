import React from 'react'
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native'

class FilmDetail extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }
  
_displayLoading() {
  if (this.state.isLoading) {
  // Si isLoading vaut true, on affiche le chargement à l'écran
  return (
    <View style={styles.loading_container}>
      <ActivityIndicator size='large' />
    </View>
      )
    }
}

  render() {
    return(
      <View style={styles.main_container}>
        {this._displayLoading}
       </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FilmDetail
