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
		flex: 2,		
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	section: {
		flex: 10,
		paddingTop: 10,
		// backgroundColor: 'blue'
	},
	title: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
	},
});

export const RecipeCard = StyleSheet.create({
	container: {
		flex: 1,
		width: SCREEN_WIDTH - 20,
		height: 'auto',
		// justifyContent: 'center',
		// alignItems: 'center',
		borderColor: '#11563B',
		borderWidth: 1,
		borderRadius: 20,
		
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
