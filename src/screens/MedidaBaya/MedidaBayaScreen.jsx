import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { styles } from './styles';
import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../components/context';
import { API_URL } from "@env"

const MedidaBayaScreen = ({ navigation, route }) => {
    const { control, baya } = route.params;
    const { loginState } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        id_control_baya: { data: baya.ControlBayas.length > 0 ? baya.ControlBayas[0].id_control_baya : null },
        medida: { data: baya.ControlBayas.length > 0 ? baya.ControlBayas[0].medida : null, isValid: true, minLength: 1, maxLength: 50 },
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
        const urlEnpoint = `${API_URL}/control-baya/${(dataForm.id_control_baya.data) ? dataForm.id_control_baya.data : ''}`;
        const methodRequest = (!dataForm.id_control_baya.data) ? 'POST' : 'PUT';
        console.log(urlEnpoint);
        console.log(methodRequest);
        console.log(JSON.stringify(getDataForm()))

        const response = await fetch(urlEnpoint, {
            method: methodRequest,
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
                        style={{ height: 60, width: 60, borderRadius: 15, marginRight: 20, marginLeft: 20 }}
                    />
                    <View>
                        <Text style={styles.name}>{loginState.nombre_completo}</Text>
                        <Text style={styles.role}>Agricultor</Text>
                    </View>
                </View>
                <Text style={styles.title}>Medida de Baya</Text>
                <View style={styles.form} >

                    <View style={styles.formRow}>
                        <Text style={styles.label}>Detalle</Text>
                        <Text style={styles.label1}>{baya.detalle}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Posición Lineal</Text>
                        <Text style={styles.label1}> {baya.posicion_lineal}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Posición   Fila</Text>
                        <Text style={styles.label1}> {baya.posicion_fila}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Medida</Text>
                        <TextInput
                            placeholderTextColor="#666666"
                            value={dataForm.medida.data}
                            style={{
                                fontSize: 40,
                                fontWeight: 'bold',
                                borderColor: '#562A66',
                                color: '#562A66',
                                borderWidth: 2,
                                borderRadius: 20,
                                width: 150,
                                textAlign: 'center',
                            }}
                            onChangeText={(val) => textInputChange(val, 'medida')}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => save()}  >
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};
export default MedidaBayaScreen;
