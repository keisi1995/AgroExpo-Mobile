import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../components/context';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { images } from '../../constants/';
const SignInScreen = ({ navigation }) => {
	const { authContext } = useContext(AuthContext);
	const { signIn } = authContext;
	const [passwordVisible, setPasswordVisible] = useState(false);

	const [dataForm, setDataForm] = React.useState({
		usuario: { data: null, isValid: true, minLength: 5, maxLength: 20 },
		password: { data: null, isValid: true, secureTextEntry: true, minLength: 5, maxLength: 20 },
	});

	const textInputChange = (val, key) => {
		setDataForm({ ...dataForm, [key]: { ...dataForm[key], data: val, isValid: (val.trim().length >= dataForm[key].minLength) ? true : false } });
	}

	const updateSecureTextEntry = () => {
		setDataForm({ ...dataForm, password: { ...dataForm.password, secureTextEntry: !dataForm.password.secureTextEntry } });
		// setDataForm({ ...dataForm, [key]: { ...dataForm[key], secureTextEntry: !dataForm[key].secureTextEntry}});
	}

	const getDataForm = () => {
		let data = {};
		Object.keys(dataForm).forEach(key => {
			data[key] = dataForm[key].data
		});
		return data;
	}
	const handleLogin = async () => {
		try {
			console.log(process.env.API_URL)
			if (dataForm.usuario.data == null || dataForm.password.data == null) {
				Alert.alert('Entrada incorrecta!', 'El campo usuario o contraseña no puede estar vacío.', [{ text: 'Ok' }]);
				return;
			}
			// console.log(process.env)							
			const response = await fetch(`${process.env.API_URL}/autenticar`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(getDataForm()),
			});

			// if (!response.ok) {
			// 	throw new Error('Error al guardar los datos');
			// }

			const rpt = await response.json();

			if (rpt.success) {
				signIn(rpt.data);
			} else {
				Alert.alert('Error!', rpt.message, [{ text: 'Ok' }]);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	return (
		<ImageBackground
			source={images.ArandanosFondo}
			style={styles.background}>
			<View style={styles.overlay}>
				<View style={styles.header}>

					<Text style={styles.textHeader}>Inicio de Sesión</Text>
				</View>

				<View style={styles.content}>
					<Text style={styles.textHeader1}>Usuario</Text>
					<View style={styles.inputContainer}>

						<Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Ingrese usuario"
							placeholderTextColor="#fff"
							autoCapitalize="none"
							value={dataForm.usuario.data}
							onChangeText={(val) => textInputChange(val, 'usuario')}
						/>
						{
							dataForm.usuario.isValid && dataForm.usuario.data != null &&
							<Animatable.View
								animation="bounceIn"
							>
								<Feather
									name="check-circle"
									color="green"
									size={20}
								/>
							</Animatable.View>
						}
					</View>
					{
						!dataForm.usuario.isValid && dataForm.usuario.data != '' &&
						<Animatable.View animation="fadeInLeft" duration={500} >
							<Text style={styles.errorMsg}>La usuario debe tener como minimo {dataForm.usuario.minLength} caracteres.</Text>
						</Animatable.View>
					}
					<Text style={styles.textHeader1}>Contraseña </Text>
					<View style={styles.inputContainer}>
						<Icon name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Contraseña"
							placeholderTextColor="#fff"
							secureTextEntry={!passwordVisible}
							autoCapitalize="none"
							value={dataForm.password.data}
							onChangeText={(val) => textInputChange(val, 'password')}
						/>
						<TouchableOpacity
							onPress={(updateSecureTextEntry)}
						></TouchableOpacity>
						<TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
							<Icon name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" style={styles.icon} />
						</TouchableOpacity>
					</View>
					{
						!dataForm.password.isValid &&
						<Animatable.View animation="fadeInLeft" duration={500}>
							<Text style={styles.errorMsg}>La contraseña debe tener como minimo {dataForm.password.minLength} caracteres.</Text>
						</Animatable.View>
					}
					<TouchableOpacity style={styles.loginButton} onPress={() => { handleLogin() }}>
						<Text style={styles.loginButtonText}>INGRESAR</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Text style={styles.loginButtonText1}>Version 1.0 </Text>
			<Image
				source={images.empresa}
				resizeMode="cover"
				style={{ height: 30, width: 30, borderRadius: 10, position: 'absolute-end', left: 380, marginTop: -30, }}
			/>
		</ImageBackground>
	);
};

export default SignInScreen;
