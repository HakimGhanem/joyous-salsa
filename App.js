import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/Search';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }


  render() {
    return (
       
       <Search/>
       
       
    );
  }
}

