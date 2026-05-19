import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

type Status = 'approved' | 'pending' | 'rejected' | 'entered' | 'available' | 'unavailable' | 'sold_out' | 'verified' | 'blacklisted' | 'preferred';

const config: Record<Status, { bg: string; text: string; label: string }> = {
  approved: { bg: Colors.successLight, text: Colors.success, label: 'Approved' },
  entered: { bg: Colors.successLight, text: Colors.success, label: 'Entered' },
  pending: { bg: Colors.warningLight, text: Colors.warning, label: 'Pending' },
  rejected: { bg: Colors.errorLight, text: Colors.error, label: 'Declined' },
  available: { bg: Colors.successLight, text: Colors.success, label: 'Available' },
  unavailable: { bg: Colors.warningLight, text: Colors.warning, label: 'Not Available' },
  sold_out: { bg: '#f3f4f6', text: Colors.textMuted, label: 'Sold Out' },
  verified: { bg: Colors.successLight, text: Colors.success, label: 'Verified' },
  blacklisted: { bg: Colors.errorLight, text: Colors.error, label: 'Blacklisted' },
  preferred: { bg: Colors.primaryLight, text: Colors.primary, label: 'Preferred' },
};

interface Props {
  status: Status;
  small?: boolean;
}

export default function StatusBadge({ status, small }: Props) {
  const c = config[status] ?? config.pending;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, small && styles.small]}>
      <Text style={[styles.text, { color: c.text }, small && styles.smallText]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  smallText: {
    fontSize: FontSize.xs,
  },
});
