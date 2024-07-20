import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { COLORS, SIZES } from '../../constants';
import { AuthContext } from '../../components/context';
import { API_URL } from "@env"

const MedidaBayaScreen = ({ navigation, route }) => {
    const { control, baya } = route.params;
    const { loginState } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        medida: { data: null, isValid: true, minLength: 1, maxLength: 50 },
        id_baya: { data: baya.id_baya },
        id_control: { data: control.id_control },
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
        const response = await fetch(`${API_URL}/control-baya/`, {
            method: 'POST',
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
                <Text style={styles.title}>Medida de Bayas</Text>
            </View>

            <View style={styles.section}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Detalle:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}> {baya.detalle}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Posición Líneal:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}> {baya.posicion_lineal}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Posición Fila:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}> {baya.posicion_fila}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, verticalAlign: 'middle' }}>Medida:</Text>
                    <TextInput
                        placeholderTextColor="#666666"
                        value={dataForm.medida.data}
                        onChangeText={(val) => textInputChange(val, 'medida')}
                    />
                </View>

                <View>
                    <ButtonAction text={"Guardar"} onPress={() => save()} />
                </View>
            </View>
        </View>
    );
};

export default MedidaBayaScreen;