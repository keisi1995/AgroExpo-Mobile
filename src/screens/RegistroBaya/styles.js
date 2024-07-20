import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../constants/';

const {width, height} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height / 4;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'black'
	},
	header: {
		flex: 1,		
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	section: {
		flex: 10,
		paddingTop: 10,
		width: width,
		// backgroundColor: 'blue',
	},
	title: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export const RecipeCard = StyleSheet.create({
	container: {
		flex: 1,
		width: SCREEN_WIDTH - 20,
		height: 150,
		// justifyContent: 'center',
		// alignItems: 'center',
		borderColor: '#11563B',
		borderWidth: 1,
		borderRadius: 20,
		backgroundColor: '#6FE5B7',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginBottom: 10
	},
	title: {
		color: 'black',
		fontSize: 30,
	},
	label: {
		color: 'black',
		fontSize: 18,		
	}
});
