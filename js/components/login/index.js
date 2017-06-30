
import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { setUser } from '../../actions/user';
import styles from './styles';

var SERVER_LOGIN_URL = 'http://mhs.rey1024.com/1415051073/login.php';
const background = ({uri : 'http://mhs.rey1024.com/1415051073/Coins.png'});

class Login extends Component {

  static propTypes = {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  login() {
    fetch(SERVER_LOGIN_URL + '?username=' + this.state.username + '&password=' + this.state.password)
      .then((response) => response.json())
      .then((responseData) => {
        var id = responseData.id;
        if (id === -1) {
          Alert.alert("Salah Username atau Password!")
         }
         else 
       {
        Actions.home();
        }  
        
      })
      .done();
  }


 


  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
              <View style={styles.bg}>
                <Item style={styles.input}>
                  <Icon active name="person" />
                  <Input placeholder="username"
                   text = {this.state.username}
                    onChangeText={(e) => this.setState({ username: e })} />
                </Item>
                <Item style={styles.input}>
                  <Icon name="unlock" />
                  <Input
                    placeholder="PASSWORD"
                    text = {this.state.password}
                    onChangeText={(e) => this.setState({ password: e })} 
                    secureTextEntry
                  />
                </Item>
                <Button style={styles.btn} onPress={() => this.login()}>
                  <Text>Login</Text>
                </Button>
              </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    
  };
}


export default connect(null, bindActions)(Login);
