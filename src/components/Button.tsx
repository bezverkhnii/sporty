/* eslint-disable react/react-in-jsx-scope */
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';

interface IButton {
  title: string;
  filled: boolean;
  onPress: () => void;
}

const Button: React.FC<IButton> = ({title, filled, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        filled
          ? {backgroundColor: COLORS.green}
          : {borderColor: COLORS.green, borderWidth: 3},
        {paddingVertical: 15, alignItems: 'center', borderRadius: 8},
      ]}
      onPress={onPress}>
      <Text
        style={[
          filled ? {color: 'white'} : {color: '#123d03'},
          {fontWeight: '600', fontSize: 16},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
