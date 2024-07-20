import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/';

import HomeScreen from '../screens/Home/HomeScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator();

const TabArr = [
	{ route: 'Home', label: 'Tareas', icon: 'find-replace', component: HomeScreen, tabBarColor: '#637aff', badge: false },
	{ route: 'User', label: 'Perfil', icon: 'human-child', component: UserScreen, tabBarColor: '#f8c907' },
];

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				tabBarStyle: {
					backgroundColor: COLORS.color,
					height: 60,
					paddingBottom: 5,
					paddingTop: 5
				},
				// tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#16A33F',
				// tabBarActiveBackgroundColor: 'red',
				// tabBarInactiveBackgroundColor: 'blue'
			}}
		>
			{
				TabArr.map((_, index) => {
					return (
						<Tab.Screen
							key={index}
							name={_.route}
							component={_.component}
							options={{
								title: _.label,
								tabBarIcon: ({ color, size }) => (
									<MaterialCommunityIcons name={_.icon} size={25} color={color} />
								)
							}}
						/>
					)
				})
			}
		</Tab.Navigator>
	);
};

export default TabNavigator;
