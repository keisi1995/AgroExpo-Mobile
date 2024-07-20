import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignIn/SignInScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	console.log('Renderizando Componenete AuthStack')

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} headerMode='none'>
			{/* options={{headerShown: false}} */}
			<Stack.Screen name="SignInScreen" component={SignInScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;
