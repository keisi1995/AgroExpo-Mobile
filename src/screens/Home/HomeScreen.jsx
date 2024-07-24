import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableHighlight, RefreshControl,ImageBackground ,Image } from 'react-native';
import { styles, RecipeCard } from './styles';
import { COLORS ,images } from '../../constants/';
import { AuthContext } from '../../components/context';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from "@env"

const HomeScreen = ({ navigation }) => {
	const { loginState } = useContext(AuthContext);
	const [category, setCategory] = useState(null);
	const [refreshing, setRefreshing] = useState(false);

	let array_jwt = jwtDecode(String(loginState.token))

	const renderItems = ({ item }) => (
		<TouchableHighlight
			underlayColor="rgba(255, 255, 255, 0.7)"
			onPress={() => {
				navigation.navigate('BayaScreen', { control: item });
			}}
		>
			 <View style={RecipeCard.taskCard}>
				<Text style={RecipeCard.taskText1}>{item.TipoControl.detalle}</Text>
				<View style={RecipeCard.taskText3}>
      				<Text style={RecipeCard.taskText}>Lote : </Text>
				  	<Text style={RecipeCard.taskText2}>{item.Floracion.detalle}</Text>
				  </View>
				<View style={RecipeCard.taskText3}>
					<Text style={RecipeCard.taskText}>Turno : </Text>
					<Text style={RecipeCard.taskText2}> {item.Floracion.Turno.detalle}</Text>
				</View>
				<View style={RecipeCard.taskText3}>
      				<Text style={RecipeCard.taskText}>Cantidad de baya : </Text>
					<Text style={RecipeCard.taskText2}> {item.Floracion.cantidad_bayas}</Text>
				</View>
				<View style={RecipeCard.taskText3}>
      				<Text style={RecipeCard.taskText}>Fecha : </Text>
					<Text style={RecipeCard.taskText2}> {item.fecha_inspeccion}</Text>
      			</View>
    			</View>
		</TouchableHighlight>
	);

	const getDataTask = async () => {
		console.log('iniciando request API');
		console.log(array_jwt.id_usuario)

		const response = await fetch(`${API_URL}/control/${array_jwt.id_usuario}/task`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${loginState.token}`
			}
		});

		if (!response.ok) { throw new Error('Error al obtener los datos'); }

		const rpt = await response.json();
		console.log(rpt)
		if (rpt.success) {
			setCategory(rpt.data);
		}
		console.log('terminando Request API');
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await getDataTask();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		getDataTask();
	}, [])

	return (
		<ImageBackground
					source={images.Fondo2}
					style={styles.background}>
		<View style={styles.container}>
			<View style={styles.header}>
			<Image
					source={images.profile}
					resizeMode="cover"
					style={{ height: 60, width: 60,  borderRadius: 15, marginRight: 20, marginLeft : 20}}
				/>
				  <View>
					<Text style={styles.name}>{loginState.nombre_completo}</Text>
					<Text style={styles.role}>Agricultor</Text>
					</View>
				</View>
				<View>
				{/* <Text style={styles.title}>Mis Tareas</Text> */}
				</View>
	
	
				<FlatList
					vertical
					showsVerticalScrollIndicator={false}	
					numColumns={1}
					data={category}
					renderItem={renderItems}
					keyExtractor={(item) => `${item.id_control}`}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					contentContainerStyle={RecipeCard.taskList}

				/>
			</View>
		</ImageBackground>
	);
};

export default HomeScreen;