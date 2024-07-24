import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../constants/';

const {width, height} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height / 4;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		marginTop: 20,
		marginBottom: 10,	
		
	  },
	  header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		borderColor: '#562A66',
		borderWidth: 2,
	  
	},
	form: {
		marginTop: 10,
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
		borderColor: '#562A66',
		borderWidth: 2,
		
	  },
	  formRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		marginTop : 15,
		
	  } ,
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
		color: 'black',
		fontWeight: 'bold',
		fontSize: 40,
		textAlign: 'center',
		
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
	button: {
		backgroundColor: '#84FC3F',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		width: '60%',
		alignSelf: 'center',
		marginTop: 20,
	  },
	  buttonText: {
		
		fontSize: 40,
		fontWeight: 'bold',
		color: '#000',
	  },
	  background: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	
	  },
	  label: {
		flex: 1,
		fontSize: 36,
		color: '#000',
		

	  },
});

