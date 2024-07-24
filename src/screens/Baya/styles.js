import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../constants/';

const {width, height} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height / 4;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		marginTop: 10,
		marginBottom: 10,
		
	  },
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		borderColor: '#562A66',
		borderWidth: 2,
	  },
	section: {
		flex: 10,
		paddingTop: 10,
		// backgroundColor: 'blue'
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
	role: {
		fontSize: 14,
		color: 'black',
	  },
	  title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 20,
		textAlign: 'center'
	  },
	  background: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	
	  },
});

export const RecipeCard = StyleSheet.create({
	taskList: {
		paddingBottom: 20,
	  },
	  taskCard: {
		backgroundColor: 'lightgreen',
		padding: 15,
		marginBottom: 20,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 20,
	  },
	  taskText: {
		fontSize: 25,
		color: '#000',
		
	  }, 
	  taskText2: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'right',
	
		flex: 1,
	  },
	 
	  taskText3: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
		
	  },
	});
