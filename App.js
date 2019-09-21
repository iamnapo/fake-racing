import React from "react";
import { StyleSheet, View, Image, Dimensions, StatusBar } from "react-native";
import { Accelerometer } from "expo-sensors";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const { width, height } = Dimensions.get("window");

export default () => {
  const [tilt, setTilt] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    StatusBar.setHidden(true);
    const _tilt = Accelerometer.addListener(({ y }) => setTilt(Math.round(y * 50) / 50));

    return () => _tilt.remove();
  }, []);

  return loading
    ? (
      <AppLoading
        startAsync={() => Asset.loadAsync([require("./assets/road.gif"), require("./assets/car.png")])}
        onFinish={() => setLoading(false)}
      />
    )
    : (
      <View style={styles.container}>
        <Image source={require("./assets/road.gif")} style={styles.road} />
        <Image source={require("./assets/car.png")} style={[styles.car, { left: width * (0.48 + tilt) }]} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  road: {
    width,
    height,
  },
  car: {
    height: 70,
    width: 70,
    position: "absolute",
    resizeMode: "contain",
    bottom: 0,
  },
});
