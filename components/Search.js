// Components/Search.js

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Image,
} from 'react-native';
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { getImageFromApi } from '../API/TMDBApi';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
    };
    this.searchedText = '';
    this.page = 0;
    this.totalPages = 0;
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          /* BAD WAY TO DO : 
      this._films = data.results
      this.forceUpdate()
      */
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: this.state.films.concat(data.results),
            isLoading: false,
          });
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.setState.isLoading) {
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>;
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          'Page : ' +
            this.page +
            ' / TotalPages : ' +
            this.totalPages +
            ' / Nombre de films : ' +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }

  render() {
    console.log(this.state.films);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._searchFilms()}
        />
        <View style={{ flex: 1, paddingTop: 20, flexDirection: 'row' }}>
          <FlatList
            style={{ marginLeft: 20 }}
            data={this.state.films}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Image
                  style={styles.image}
                  source={{ uri: getImageFromApi(item.poster_path) }}
                />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text style={styles.titre}>{item.title}</Text>
                  <Text
                    style={{flex: 1, marginLeft: 5}}
                    numberOfLines={6}>
                    {item.overview}
                  </Text>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.state.films.length > 0 && this.page < this.totalPages) {
                this._loadFilms;
              }
            }}
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
  titre: {
    flex: 1,
    marginLeft: 5,
    marginTop: 9,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    marginTop: 9,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
