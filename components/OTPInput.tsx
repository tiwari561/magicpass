import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors, Radius, FontSize } from '@/constants/theme';

interface Props {
  length?: number;
  value: string;
  onChange: (val: string) => void;
}

export default function OTPInput({ length = 6, value, onChange }: Props) {
  const inputs = useRef<(TextInput | null)[]>([]);

  const digits = value.split('').slice(0, length);
  while (digits.length < length) digits.push('');

  const handleChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    const joined = newDigits.join('');
    onChange(joined);
    if (cleaned && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(r) => { inputs.current[i] = r; }}
          style={[styles.cell, digit ? styles.cellFilled : null]}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  cell: {
    width: 48,
    height: 56,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  cellFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
});
