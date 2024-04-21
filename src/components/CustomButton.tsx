/* eslint-disable react/react-in-jsx-scope */
import {ButtonProps, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';

interface IButton {
  title: string;
  filled?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<IButton> = ({
  title,
  filled,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        filled
          ? {backgroundColor: COLORS.green}
          : {borderColor: COLORS.green, borderWidth: 3},
        disabled ? {backgroundColor: COLORS.transparent} : {},
        {paddingVertical: 15, alignItems: 'center', borderRadius: 8},
      ]}
      onPress={onPress}>
      <Text
        style={[
          filled ? {color: 'white'} : {color: COLORS.green},
          {fontWeight: '600', fontSize: 16},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
