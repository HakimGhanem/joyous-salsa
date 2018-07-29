// Components/Search.js

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Image
} from 'react-native';
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { getImageFromApi } from '../API/TMDBApi';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
    this.searchedText = '';
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        /* BAD WAY TO DO : 
      this._films = data.results
      this.forceUpdate()
      */
        this.setState({ films: data.results });
      });
    }

  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Titre du film" onChangeText= {(text) => this._searchTextInputChanged(text)} />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._loadFilms()}
        />
        <View style={{ flex: 1, paddingTop: 20 }}>
          <FlatList
            style={{ marginLeft: 20 }}
            data={this.state.films}
            renderItem={({ item }) => (
              //<FilmItem film={item}/>
              
              <Text>{item.title}
              <Image 
                style={styles.image}
                source={{uri: getImageFromApi(item.poster_path)}}
              /></Text>
              
            )}
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
    marginTop: 40,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
});

export default Search;
