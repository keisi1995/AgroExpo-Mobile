import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert ,ImageBackground, Image } from 'react-native';
import { styles } from './styles';
import { COLORS, SIZES ,images } from '../../constants';
import { AuthContext } from '../../components/context';
import { API_URL } from "@env"

const RegistroBayaScreen = ({ navigation, route }) => {
    const { baya } = route.params;
    const { loginState } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        detalle: { data: baya.detalle, isValid: true, minLength: 1, maxLength: 50 },
        posicion_lineal: { data: baya.posicion_lineal, isValid: true, minLength: 1, maxLength: 20 },
        posicion_fila: { data: baya.posicion_fila, isValid: true, secureTextEntry: true, minLength: 1, maxLength: 20 },
    });

    const textInputChange = (val, key) => {
        setDataForm({ ...dataForm, [key]: { ...dataForm[key], data: val, isValid: (val.trim().length >= dataForm[key].minLength) ? true : false } });
    }

    const getDataForm = () => {
        let data = {};
        Object.keys(dataForm).forEach(key => {
            data[key] = dataForm[key].data
        });
        return data;
    }

    const save = async () => {
        const response = await fetch(`${API_URL}/baya/${baya.id_baya}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginState.token}`,
            },
            body: JSON.stringify(getDataForm()),
        });
        console.log(response);
        if (!response.ok) { throw new Error('Error al obtener los datos'); }

        const rpt = await response.json();
        console.log(rpt);
        if (rpt.success) {
            // Alert.alert('Success!', rpt.message, [{ text: 'Ok' }]);          
            navigation.goBack();
        } else {
            Alert.alert('Error!', rpt.message, [{ text: 'Ok' }]);
        }
    }

    useEffect(() => {
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
            <Text style={styles.title}>Registro de Bayas</Text> 
            <View style={styles.form}>
          
                <View style={styles.formRow}>
                    <Text style={styles.label}>Detalle</Text>
                    <TextInput
                        placeholderTextColor="#666666"
                        style={{ fontSize: 35, 
                            fontWeight: 'bold',
                            borderColor: '#562A66',
                            borderWidth: 2,
                            borderRadius: 20, 
                            color: '#562A66',
                            width:  160,
                            textAlign: 'center',}}
                        value={dataForm.detalle.data}
                        onChangeText={(val) => textInputChange(val, 'detalle')}
                    />
                </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Posición Lineal</Text>
                <TextInput
                        placeholderTextColor="#666666"
                        style={{ fontSize: 35, 
                            fontWeight: 'bold',
                            borderColor: '#562A66',
                            borderWidth: 2,
                            borderRadius: 20, 
                            color: '#562A66',
                            width:  160,
                            textAlign: 'center',}}
                        value={dataForm.posicion_lineal.data}
                        onChangeText={(val) => textInputChange(val, 'posicion_lineal')}
                    />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Posición Fila</Text>
                <TextInput
                        placeholderTextColor="#666666"
                        value={dataForm.posicion_fila.data}
                        style={{ fontSize: 35, 
                            fontWeight: 'bold',
                            borderColor: '#562A66',
                            borderWidth: 2,
                            borderRadius: 20, 
                            color: '#562A66',
                            width:  160,
                            textAlign: 'center',}}
                        onChangeText={(val) => textInputChange(val, 'posicion_fila')}
                    />
            </View>
            <Image
					source={images.blueberry}
					resizeMode="cover"
					style={{ height: 80, width: 80,  borderRadius: 15, alignSelf : 'center' , marginTop: 20}}/>
            <TouchableOpacity style={styles.button} onPress={() => save()} >
                        <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
    );
};

export default RegistroBayaScreen;