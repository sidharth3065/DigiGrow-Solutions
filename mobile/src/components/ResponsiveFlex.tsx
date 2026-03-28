import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { ReactNode } from 'react';

export const ResponsiveFlex = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: isPortrait ? 20 : 10,
          paddingHorizontal: isPortrait ? 20 : 10,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});