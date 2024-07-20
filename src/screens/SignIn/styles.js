import {StyleSheet, Dimensions, Platform} from 'react-native';
import { COLORS } from '../../constants/';

const {height, width} = Dimensions.get('screen');
// const height_logo = height * 0.38;
// const width_logo = width - 10;
const height_logo = 75;
const width_logo = 250;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.color,
		marginHorizontal: 20
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		// backgroundColor: 'blue',
		paddingBottom: 20,
	},
	textHeader: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
	},		
	section: {
		flex: 4,
		// borderTopLeftRadius: 30,
		// borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,		
	},
	label: {
		color: '#05375a',
		fontSize: 18,
	},
	sectionInput: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	button: {
		alignItems: 'center',
		marginTop: 50,
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

export default styles;
