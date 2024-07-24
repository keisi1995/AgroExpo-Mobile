import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableHighlight, RefreshControl, ImageBackground, Image } from 'react-native';
import { styles, RecipeCard } from './styles';
import { COLORS, images } from '../../constants/';
import { AuthContext } from '../../components/context';
import { API_URL } from "@env";

const BayaScreen = ({ navigation, route }) => {
  console.log('Renderizando Componente Baya');

  const { control } = route.params;
  const { loginState } = useContext(AuthContext);
  const [bayas, setBayas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getDataTask = async () => {
    console.log('iniciando request API');
    // console.log(control.id_control);
    const response = await fetch(`${API_URL}/control/${control.id_control}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginState.token}`
      }
    });
    console.log('terminando Request API');

    if (!response.ok) { throw new Error('Error al obtener los datos'); }

    const rpt = await response.json();
    // console.log(rpt);

    if (rpt.success) {
      console.log(rpt.data.Bayas)
      setBayas(rpt.data.Bayas);
    }
  }

  const renderItems = ({ item }) => {
    if (control.id_tipo_control === 2 && (!item.posicion_lineal || !item.posicion_fila)) {
      return null;
    }

    return (
      <TouchableHighlight
        underlayColor="rgba(255, 255, 255, 0.7)"
        onPress={() => {
          navigation.navigate((control.id_tipo_control === 1 ? 'RegistroBayaScreen' : 'MedidaBayaScreen'), { control: control, baya: item });
        }}
      >
        <View style={[RecipeCard.taskCard, { backgroundColor: (item.posicion_lineal && item.posicion_fila ? '#E7ACFE' : '#F66262'), }]}>
          <Text style={[RecipeCard.taskText, { textAlign: 'center', marginBottom: 10, fontSize: 45, fontWeight: 'bold' }]}>
            {item.detalle}
          </Text>
          <View style={RecipeCard.taskText3}>
            <Text style={RecipeCard.taskText}>Posicion Lineal: </Text>
            <Text style={RecipeCard.taskText2}>{(item.posicion_lineal ? item.posicion_lineal : 'Sin Registrar')}</Text>
          </View>
          <View style={RecipeCard.taskText3}>
            <Text style={RecipeCard.taskText}>Posición Fila:</Text>
            <Text style={RecipeCard.taskText2}>{(item.posicion_fila ? item.posicion_fila : 'Sin Registrar')}</Text>
          </View>
          {
            control.id_tipo_control == 2 ? (
              <View style={RecipeCard.taskText3}>
                <Text style={RecipeCard.taskText}>Medida:</Text>
                <Text style={RecipeCard.taskText2}>{(item.ControlBayas.length > 0 ? item.ControlBayas[0].medida : 'Sin Registrar')}</Text>
              </View>
            ) : null}
        </View>
      </TouchableHighlight>
    );
  };

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
        <View>
          <Text style={styles.title}>{control.TipoControl.detalle}</Text>
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
            contentContainerStyle={RecipeCard.taskList}
          />
        </View>
      </View>

    </ImageBackground>
  );
};

export default BayaScreen;