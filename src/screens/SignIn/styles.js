import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('screen');
// const height_logo = height * 0.38;
// const width_logo = width - 10;
const height_logo = 75;
const width_logo = 250;

const styles = StyleSheet.create({
	background: {
	  flex: 1,
	  resizeMode: 'cover',
	  justifyContent: 'center',
	},
	textHeader: {
	  color: 'white',
	  fontWeight: 'bold',
	  fontSize: 30,
	  marginLeft: 10, 
	  
	},
	textHeader1: {
	
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 10,

	  },
	overlay: {
	  flex: 1,
	  backgroundColor: 'rgba(0, 0, 0, 0.6)',
	  justifyContent: 'center',
	  padding: 20,
	},
	header: {
	  flexDirection: 'center', 
	  alignItems: 'center',
	  marginBottom: 20, 
	  
	},
	logo: {
	  width: 50,
	  height: 50,
	  resizeMode: 'contain',

	},
	content: {
	  alignItems: 'left',
	},
	inputContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  backgroundColor: 'rgba(255, 255, 255, 0.3)',
	  padding: 10,
	  borderRadius: 10,
	  borderColor: '#fff',
	  borderWidth: 1,
	  marginBottom: 15,
	  width: '100%',
	},
	icon: {
	  marginRight: 10,
	},
	input: {
	  flex: 1,
	  color: '#fff',
	},
	loginButton: {
	  backgroundColor: '#16A33F',
	  padding: 15,
	  borderRadius: 10,
	  width: '80%',
	  alignItems: 'center',
	  marginLeft: 40,
	  marginTop: 15,
	},
	
	loginButtonText: {
	  color: '#fff',
	  fontSize: 18,
	  fontWeight: 'bold',
	},
	loginButtonText1: {
		color: '#fff',
		fontSize: 15,
		textAlign: 'left',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	  },
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
  });
  

export default styles;
