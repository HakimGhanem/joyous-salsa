import React from 'react'
import {Text, View, StyleSheet} from 'react-native-elements'


class FilmItem extends React.Component {

  render(){
    return (

      <View style={styles.main_container}>
        <Text style={styles.title_text}> XXXX </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    height: 190
  },
  title_text:{

  }

})

export default FilmItem;