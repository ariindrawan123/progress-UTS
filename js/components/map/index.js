import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.google.co.id/maps/@-8.4554715,115.071577,10z'}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default MyWeb