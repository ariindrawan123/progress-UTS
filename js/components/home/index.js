
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, ListView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const moneyIcon = ({uri : 'http://mhs.rey1024.com/1415051073/money.png'});
var URL="http://mhs.rey1024.com/1415051073/list.php";

class Home extends Component {

  constructor(props){
    super(props);
    var ds = new 
    ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
       dataSource: ds,
    };
  }

  AmbilDataKoin() {
    fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows
        (responseData),
      });
    }) .done();
  }

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  renderRow(record) {
    return (
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={moneyIcon} style={styles.icon} />
        </View>
        <View style={styles.info}>
          <Text style={styles.items}>{record.nama}</Text>
          <Text style={styles.address}>{record.alamat}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.date}>Total Coin.</Text>
          <Text style={styles.price}>Rp.{record.jml_coin}</Text>
        </View>
      </View>
    );
  }

  render() {
    this.AmbilDataKoin();
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Left>

          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          <Grid style={styles.mt}>
            <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Home);
