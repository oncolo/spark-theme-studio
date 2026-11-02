import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  children: React.ReactNode;
}

export function PressableScale({ style, scaleTo = 0.97, children, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (toValue: number) =>
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  return (
    <Pressable {...rest} onPressIn={() => animate(scaleTo)} onPressOut={() => animate(1)}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
