import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabScreen from './TabNavigator';
import BayaScreen from '../screens/Baya/BayaScreen';
import RegistroBayaScreen from '../screens/RegistroBaya/RegistroBayaScreen';
import MedidaBayaScreen from '../screens/MedidaBaya/MedidaBayaScreen'

const Stack = createNativeStackNavigator();

const AppStack = () => {
	console.log('Renderizando Componenete AppStack');

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} headerMode='none'>
			<Stack.Screen name="MainTabScreen" component={MainTabScreen} />
			<Stack.Screen name="BayaScreen" component={BayaScreen} />
			<Stack.Screen name="RegistroBayaScreen" component={RegistroBayaScreen} />
			<Stack.Screen name="MedidaBayaScreen" component={MedidaBayaScreen} />
		</Stack.Navigator>
	);
};

export default AppStack;
