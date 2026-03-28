import { Animated, View, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export const ThreeDBackground = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const interpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={{
          width: 120,
          height: 120,
          backgroundColor: '#44aaee',
          borderRadius: 60,
          transform: [{ rotate: interpolate }],
          position: 'absolute',
          top: -30,
          left: -30,
        }}
      />
    </View>
  );
};