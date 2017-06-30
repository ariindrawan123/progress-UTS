
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body,View, Item, Input, Alert } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var url = 'http://mhs.rey1024.com/1415051073/daftar_tucoin.php'; 

class BlankPage extends Component {
constructor(props) {
    super(props);
    this.state = {
      nama: "",
      no_hp: "",
      alamat: "",
      line: "",
      jml_coin: "",
    };
  }

  onSave() {
    fetch(url + '?nama=' + this.state.nama + '&no_hp=' + this.state.no_hp + '&alamat=' + this.state.alamat + '&line=' + this.state.line + '&jml_coin=' + this.state.jml_coin)
      .then((response) => response.json())
      .then((responseData) => {
        var id = responseData.id;
        if (id === -1) {
           Alert.alert("Silahkan masukkan semua data")
         }
         else 
       {
        Actions.home();
        }  
  })
  .done();    
}
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{(name) ? this.props.name : 'Daftar Coin'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
                <Item style={styles.input}>
                  <Input placeholder="Nama Lengkap"
                   text = {this.state.nama}
                    onChangeText={(e) => this.setState({ nama: e })} />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="No Telepon"
                    text = {this.state.no_hp}
                    onChangeText={(e) => this.setState({ no_hp: e })} 
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="alamat"
                    text = {this.state.alamat}
                    onChangeText={(e) => this.setState({ alamat: e })} 
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Id Line"
                    text = {this.state.line}
                    onChangeText={(e) => this.setState({ line: e })} 
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Jumlah Coin"
                    text = {this.state.jml_coin}
                    onChangeText={(e) => this.setState({ jml_coin: e })} 
                  />
                </Item>              
                <Button style={styles.btn} onPress={() => this.onSave()}>
                  <Text>Save</Text>
                </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
