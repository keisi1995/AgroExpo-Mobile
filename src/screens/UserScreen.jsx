import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, useWindowDimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants/";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { AuthContext } from '../components/context';
import { photos } from "../constants/data";

const tabPhotos = () => (
	<View style={{ flex: 1 }}>
		<FlatList
			data={photos}
			numColumns={3}
			renderItem={({ item, index }) => (
				<View style={{ flex: 1, aspectRatio: 1, margin: 3 }} >
					<Image
						key={index}
						source={item}
						style={{ width: "100%", height: "100%", borderRadius: 12 }}
					/>
				</View>
			)}
		/>
	</View>
);

const tabComments = () => (
	<View style={{ flex: 1 }}>
		<Text>Hola</Text>
	</View>
);

const renderScene = SceneMap({
	tab_photos: tabPhotos,
	tab_comments: tabComments
});

const renderTabBar = (props) => (
	<TabBar
		{...props}
		indicatorStyle={{ backgroundColor: COLORS.primary }}
		style={{ backgroundColor: COLORS.white, height: 40 }}
		renderLabel={({ focused, route }) => (
			<Text style={[{ color: focused ? COLORS.black : COLORS.black }]}>
				{route.title}
			</Text>
		)}
	/>
);

const ItemRandom = ({ number, text }) => {
	return (
		<View style={{
			flexDirection: "column",
			alignItems: "center",
			marginHorizontal: SIZES.padding,
		}}
		>
			<Text style={{ ...FONTS.h2, color: COLORS.primary }} >{number}</Text>
			<Text style={{ ...FONTS.body4, color: COLORS.primary }} >{text}</Text>
		</View>
	)
}

const ButtonAction = ({ text, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				width: 130,
				height: 36,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLORS.primary,
				borderRadius: 10,
				marginHorizontal: SIZES.padding * 0.5,
			}}
			onPress={onPress}
		>
			<Text style={{
				fontFamily: 'regular',
				fontSize: SIZES.body4,
				lineHeight: 20,
				color: COLORS.white
			}} > {text}</Text>
		</TouchableOpacity>
	)
}

const UserScreen = ({ navigation }) => {
	const layout = useWindowDimensions();
	const { loginState, authContext } = useContext(AuthContext);
	const { signOut } = authContext;

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "tab_photos", title: "Mis fotos" },
		{ key: "tab_comments", title: "Comentarios" }
	]);

	const navigateToEditProfile = () => {
		console.log('EditProfile');
		// navigation.navigate("EditProfile");
	};

	const navigateToLogin = () => {
		console.log('navigateToLogin');
		// navigation.navigate("Login");
	};

	return (
		<SafeAreaView style={styles.container} >
			<View style={styles.containerPortada}>
				<Image
					source={images.cover}
					resizeMode="cover"
					style={{ height: 200, width: "100%" }}
				/>
			</View>

			<View style={styles.containerMain}>
				<Image
					source={images.profile}
					resizeMode="contain"
					style={{
						height: 150,
						width: 150,
						borderRadius: 180,
						borderColor: COLORS.color,
						borderWidth: 2,
						marginTop: -90
					}}
				/>

				<Text style={{
					fontFamily: 'bold',
					fontSize: SIZES.h3,
					lineHeight: 20,
					color: COLORS.primary,
					marginTop: 10
				}}>{loginState.nombre_completo}</Text>

				<Text style={{
					fontFamily: 'regular',
					fontSize: SIZES.body4,
					lineHeight: 20,
					color: COLORS.black,
					marginTop: 5
				}}> Interior designer </Text>

				{/* Direccion*/}
				<View style={{ flexDirection: "row", marginTop: 3, alignItems: "center" }} >
					<MaterialIcons name="location-on" size={24} color="black" />
					<Text
						style={{
							fontFamily: 'regular',
							fontSize: SIZES.body4,
							lineHeight: 20,
							marginLeft: 2
						}}
					>Lagos, Nigeria</Text>
				</View>
				{/* fin Direccion */}

				{/* info */}
				<View style={{ flexDirection: "row", marginVertical: 5 }} >
					<ItemRandom number={'122'} text={"Followers"} />
					<ItemRandom number={'67'} text={"Followings"} />
					<ItemRandom number={'77K'} text={"Likes"} />
				</View>
				{/* fin info */}

				{/* button */}
				<View style={{ flexDirection: "row", paddingBottom: 10 }}>

					<ButtonAction text={"Cerrar Session"} onPress={() => signOut()} />
				</View>
				{/* fin button */}
			</View>


		</SafeAreaView>
	);
};

export default UserScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerPortada: {
		width: "100%"
	},
	containerMain: {
		// flex: 1, 
		alignItems: "center",
	},
	containerTab: {
		flex: 1,
		marginHorizontal: 10,
	}
});
