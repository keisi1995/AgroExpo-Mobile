import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableHighlight, RefreshControl } from 'react-native';
import { styles, RecipeCard } from './styles';
import { COLORS } from '../../constants/';
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
			<View style={RecipeCard.container}>
				<Text style={RecipeCard.label}>
					Lote: {item.Floracion.detalle}
				</Text>
				<Text style={RecipeCard.label}>
					Turno: {item.Floracion.Turno.detalle}
				</Text>
				<Text style={RecipeCard.label}>
					Cantidad bayas: {item.Floracion.cantidad_bayas}
				</Text>
				<Text style={RecipeCard.label}>
					Fecha: {item.fecha_inspeccion}
				</Text>
				<Text style={RecipeCard.label}>
					Tipo Control: {item.TipoControl.detalle}
				</Text>
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
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Bienvenido {loginState.nombre_completo}</Text>
			</View>

			<View style={styles.section}>
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
				/>
			</View>
		</View>
	);
};

export default HomeScreen;