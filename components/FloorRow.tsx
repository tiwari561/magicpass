import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { Floor } from '@/constants/mockData';
import StatusBadge from './StatusBadge';

interface Props {
  floor: Floor;
  editable?: boolean;
  onToggle?: (available: boolean) => void;
  strikethrough?: boolean;
}

export default function FloorRow({ floor, editable, onToggle, strikethrough }: Props) {
  const isAvailable = floor.status === 'available';

  return (
    <View style={[styles.row, floor.status === 'sold_out' && styles.soldOut]}>
      <View style={styles.left}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{floor.code}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.label, strikethrough && !isAvailable && styles.strike]}>{floor.label}</Text>
          <Text style={styles.sub}>
            {floor.carpetArea.toLocaleString()} sq.ft · {floor.askingPrice}
          </Text>
          {floor.builderNote ? (
            <View style={styles.noteRow}>
              <Ionicons name="information-circle" size={12} color={Colors.primary} />
              <Text style={styles.noteText}>{floor.builderNote}</Text>
            </View>
          ) : null}
          {floor.reason ? (
            <Text style={styles.reason}>{floor.reason}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        {editable ? (
          <Switch
            value={isAvailable}
            onValueChange={onToggle}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        ) : (
          <StatusBadge status={floor.status as any} small />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  soldOut: {
    opacity: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: Spacing.sm,
  },
  codeBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  code: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  strike: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  sub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  noteText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '500',
  },
  reason: {
    fontSize: FontSize.xs,
    color: Colors.warning,
    marginTop: 2,
  },
  right: {
    marginLeft: Spacing.sm,
  },
});
