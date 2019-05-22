//Tao project:  react-native init xxx
//tao server: npm init ->enter...
//cai cac goi tren server: ejs, express, socket.io ->: npm install express ejs socket.io
//Tao server: Server.js --> run: node Server.js
//cai socket.io cho client(react-native): npm install react-native-socket.io-client
//chat nhom: tu khoa chanel


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
//import io from "socket.io-client/dist/socket.io.js"
import io from "react-native-socket.io-client"

var e;
export default class App extends Component {
  constructor(props){
    super(props);
    e = this;
    this.socket = io("http://192.168.0.101:3000", {jsonp:false});
    this.state = {
      maunen:'green',
      text: 'color input'
    }
    this.socket.on("server-send-color", function(data){
      e.setState({
      //this.setState({
        maunen: data,
        text: data
      });
    });
  }
  clickme(){
    this.socket.emit("client-send-color", this.state.text)
  }
  render() {
    return (
      <View style ={{flex:1, padding:50, backgroundColor: this.state.maunen}}>
        <TextInput
        style={{height: 40, borderColor: 'white', padding:5 ,borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <TouchableOpacity
          onPress = {()=>{this.clickme()}}
           style={{height: 40, borderColor: 'white', padding:5 ,borderWidth: 1, marginTop: 5}}>
          <Text>Change Color</Text>
        </TouchableOpacity>
      </View>
    );
  }
}