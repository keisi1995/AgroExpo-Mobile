import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../components/context';

import styles from './styles';
import { images, COLORS } from '../../constants/';

const SignInScreen = ({ navigation }) => {
	const { authContext } = useContext(AuthContext);
	const { signIn } = authContext;
	const { colors } = useTheme();

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

			if (!response.ok) {
				throw new Error('Error al guardar los datos');
			}

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
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.textHeader}>Inicio de Sesión</Text>
			</View>

			<View style={[styles.section, { backgroundColor: colors.background }]}>
				{/* seccion del userName */}
				<Text style={[styles.label, { color: colors.text }]}>Usuario</Text>
				<View style={styles.sectionInput}>
					<FontAwesome
						name="user-o"
						color={colors.text}
						size={20}
					/>
					<TextInput
						placeholder="Ingrese usuario"
						placeholderTextColor="#666666"
						style={[styles.textInput, { color: colors.text }]}
						autoCapitalize="none"
						value={dataForm.usuario.data}
						onChangeText={(val) => textInputChange(val, 'usuario')}
					// onEndEditing={(e)=> handleValidUser(e.nativeEvent.text)}
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
				{/* fin */}

				{/* seccion del password */}
				<Text style={[styles.label, { color: colors.text, marginTop: 35 }]}>Contraseña</Text>
				<View style={styles.sectionInput}>
					<Feather
						name="lock"
						color={colors.text}
						size={20}
					/>
					<TextInput
						placeholder="Ingrese su contraseña"
						placeholderTextColor="#666666"
						secureTextEntry={dataForm.password.secureTextEntry ? true : false}
						style={[styles.textInput, { color: colors.text }]}
						autoCapitalize="none"
						value={dataForm.password.data}
						onChangeText={(val) => textInputChange(val, 'password')}
					/>
					<TouchableOpacity
						onPress={(updateSecureTextEntry)}
					>
						<Feather
							name={dataForm.password.secureTextEntry ? "eye-off" : "eye"}
							color="grey"
							size={20}
						/>
					</TouchableOpacity>
				</View>
				{
					!dataForm.password.isValid &&
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>La contraseña debe tener como minimo {dataForm.password.minLength} caracteres.</Text>
					</Animatable.View>
				}
				{/* fin */}


				{/* seccion de los buttons */}
				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() => { handleLogin() }}
					>
						<LinearGradient
							colors={COLORS.colorButton}
							style={styles.signIn}
						>
							<Text style={[styles.textSign, {
								color: '#fff'
							}]}>Iniciar sesión</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SignInScreen;
