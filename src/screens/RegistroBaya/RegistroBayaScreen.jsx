import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { COLORS, SIZES } from '../../constants';
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

        if (!response.ok) { throw new Error('Error al obtener los datos'); }

        const rpt = await response.json();

        if (rpt.success) {
            // Alert.alert('Success!', rpt.message, [{ text: 'Ok' }]);          
            navigation.goBack();
        } else {
            Alert.alert('Error!', rpt.message, [{ text: 'Ok' }]);
        }
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

    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Registro de Bayas</Text>
            </View>

            <View style={styles.section}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Detalle:</Text>
                    <TextInput
                        placeholderTextColor="#666666"
                        style={{ fontSize: 20, }}
                        value={dataForm.detalle.data}
                        onChangeText={(val) => textInputChange(val, 'detalle')}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Posición Líneal:</Text>
                    <TextInput
                        placeholderTextColor="#666666"
                        style={{}}
                        value={dataForm.posicion_lineal.data}
                        onChangeText={(val) => textInputChange(val, 'posicion_lineal')}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Posición Fila:</Text>
                    <TextInput
                        placeholderTextColor="#666666"
                        value={dataForm.posicion_fila.data}
                        onChangeText={(val) => textInputChange(val, 'posicion_fila')}
                    />
                </View>

                <View>
                    <ButtonAction text={"Guardar"} onPress={() => save()} />
                </View>
            </View>
        </View>
    );
};

export default RegistroBayaScreen;