import React from "react";
import { StyleSheet, View, Image, Dimensions, StatusBar } from "react-native";
import { useAccelerometer } from "@use-expo/sensors";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const { width, height } = Dimensions.get("window");

StatusBar.setHidden(true);

export default () => {
	const [{ y }] = useAccelerometer({ interval: 100, initial: { y: 0 } });
	const [loading, setLoading] = React.useState(true);

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
				<Image source={require("./assets/car.png")} style={[styles.car, { left: width * (0.48 + y) }]} />
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
