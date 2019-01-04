import React from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar } from 'react-native';
import { Accelerometer } from 'expo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tilt: 0 };
    this._tilt = null;
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this._tilt = Accelerometer.addListener((item) => {
      this.setState({ tilt: Math.round(item.y * 50) / 50 });
    });
  }

  componentWillUnmount() {
    this._tilt.remove();
  }

  render() {
    const { tilt } = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./assets/road.gif')} style={styles.road} />
        <Image source={require('./assets/car.png')} style={[styles.car, { left: width * (0.48 + tilt) }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  road: {
    width,
    height,
  },
  car: {
    height: 70,
    width: 70,
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
  },
});
