// Components/Search.js

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
} from 'react-native';
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {

  
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://api.myjson.com/bins/hj3ui')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Titre du film" />
        <Button style={{ height: 50 }} title="Rechercher" />
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
          style={{marginLeft:20}}
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.title}, {item.releaseYear}            </Text>}
            keyExtractor={(item, index) => item}
          />
          
        </View>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
});

export default Search;
