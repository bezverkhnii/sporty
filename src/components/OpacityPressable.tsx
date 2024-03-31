import React, {useState} from 'react';
import {Pressable} from 'react-native';

const OpacityPressable = ({children, onPress}) => {
  const [opacity, setOpacity] = useState(1);
  const handlePressIn = () => {
    setOpacity(0.5); // Change opacity to 0.5 when pressed in
  };

  const handlePressOut = () => {
    setOpacity(1); // Change opacity back to 1 when pressed out
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{opacity}}>
      {children}
    </Pressable>
  );
};

export default OpacityPressable;
