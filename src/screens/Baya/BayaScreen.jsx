import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableHighlight, RefreshControl } from 'react-native';
import { styles, RecipeCard } from './styles';
import { COLORS } from '../../constants/';
import { AuthContext } from '../../components/context';
import { API_URL } from "@env"
import { Button } from 'react-native-paper';

const BayaScreen = ({ navigation, route }) => {
    console.log('Renderizando Componenete Baya');

    const { control } = route.params;
    const { loginState } = useContext(AuthContext);
    const [bayas, setBayas] = useState(null);
    const [count, setCount] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const getDataTask = async () => {
        console.log('iniciando request API');

        const response = await fetch(`${API_URL}/floracion/${control.Floracion.id_floracion}/bayas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginState.token}`
            }
        });
        console.log('terminando Request API');

        if (!response.ok) { throw new Error('Error al obtener los datos'); }

        const rpt = await response.json();

        if (rpt.success) {
            setBayas(rpt.data);
        }

    }

    const renderItems = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.7)"
            onPress={() => {
                navigation.navigate((control.id_tipo_control == 1 ? 'RegistroBayaScreen' : 'MedidaBayaScreen'), { control: control, baya: item });
            }}
        >
            <View style={[RecipeCard.container, { backgroundColor: (item.posicion_lineal && item.posicion_fila ? '#67F478' : '#FFC06F'), }]}>
                <Text style={[RecipeCard.label, { textAlign: 'center', marginBottom: 5 }]}>
                    {item.detalle}
                </Text>
                <Text style={RecipeCard.label}>
                    Posicion Lineal: {(item.posicion_lineal ? item.posicion_lineal : 'Sin Registrar')}
                </Text>
                <Text style={RecipeCard.label}>
                    Posición Fila: {(item.posicion_fila ? item.posicion_fila : 'Sin Registrar')}
                </Text>
            </View>
        </TouchableHighlight>
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getDataTask();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        getDataTask();
    }, []);

    useEffect(() => {
        console.log('useeEfect2');
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('Focus');
            getDataTask();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{control.TipoControl.detalle}</Text>
                {/* <Text style={styles.title}>{count}</Text>
                <Button title={'Incrementar'} style={{ backgroundColor: 'red' }} onPress={() => setCount(count + 1)}></Button> */}
            </View>

            <View style={styles.section}>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={bayas}
                    renderItem={renderItems}
                    keyExtractor={(item) => `${item.id_baya}`}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </View>
        </View>
    );
};

export default BayaScreen;