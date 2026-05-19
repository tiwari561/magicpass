import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from './StatusBadge';
import { Property } from '@/constants/mockData';

interface Props {
  property: Property;
  onPress: () => void;
}

export default function PropertyCard({ property, onPress }: Props) {
  const availableFloors = property.floors.filter(f => f.status === 'available').length;

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#f3f4f6' }}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{property.name}</Text>
          <StatusBadge status="available" small />
        </View>
        <Text style={styles.builder}>{property.builderName} · {property.locality}</Text>
      </View>

      <View style={styles.chips}>
        <Chip icon="bed-outline" label={property.accommodation} />
        <Chip icon="construct-outline" label={property.constructionStatus} />
        <Chip icon="resize-outline" label={`${property.coveredArea.toLocaleString()} sq.ft`} />
        <Chip icon="car-outline" label={`${property.carParking} car park`} />
      </View>

      <View style={styles.footer}>
        <View style={styles.floorInfo}>
          <Ionicons name="layers-outline" size={14} color={Colors.primary} />
          <Text style={styles.floorText}>{availableFloors} floors available</Text>
        </View>
        <Text style={styles.price}>{property.askingPrice}</Text>
      </View>

      {property.builderNote ? (
        <View style={styles.noteRow}>
          <Ionicons name="information-circle" size={13} color={Colors.primary} />
          <Text style={styles.note}>{property.builderNote}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function Chip({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={12} color={Colors.textSecondary} />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  builder: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  chipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  floorText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  note: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '500',
  },
});
