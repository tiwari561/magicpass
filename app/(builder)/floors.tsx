import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import FloorRow from '@/components/FloorRow';
import { MOCK_PROPERTIES, Floor } from '@/constants/mockData';

export default function FloorsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();

  const property = MOCK_PROPERTIES.find(p => p.id === propertyId) ?? MOCK_PROPERTIES[0];
  const [floors, setFloors] = useState<Floor[]>(property.floors);
  const [saved, setSaved] = useState(false);

  const toggleFloor = (code: string, available: boolean) => {
    setFloors(prev => prev.map(f =>
      f.code === code ? { ...f, status: available ? 'available' : 'unavailable' } : f
    ));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  const availableCount = floors.filter(f => f.status === 'available').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Floor availability</Text>
          <Text style={styles.subtitle}>{property.name}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{availableCount}/{floors.length}</Text>
          <Text style={styles.countLabel}>avail</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={15} color={Colors.primary} />
          <Text style={styles.infoText}>
            Brokers only see floors you mark as available. Toggle to control access per floor.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>FLOORS & AVAILABILITY</Text>
          {floors.map(floor => (
            <FloorRow
              key={floor.code}
              floor={floor}
              editable
              onToggle={(available) => toggleFloor(floor.code, available)}
            />
          ))}
        </View>

        <View style={styles.builderNoteCard}>
          <Text style={styles.sectionTitle}>BUILDER NOTE</Text>
          <Text style={styles.builderNoteText}>
            {property.builderNote || 'No note set. Tap to add a note visible on every approval.'}
          </Text>
          <Pressable style={styles.editNoteBtn}>
            <Ionicons name="pencil-outline" size={14} color={Colors.primary} />
            <Text style={styles.editNoteBtnText}>Edit note</Text>
          </Pressable>
        </View>

        {saved ? (
          <View style={styles.savedMsg}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            <Text style={styles.savedMsgText}>Saved! Brokers will see the new status on their next scan.</Text>
          </View>
        ) : null}

        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save-outline" size={18} color={Colors.white} />
          <Text style={styles.saveBtnText}>Save changes</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1 },
  title: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary },
  countBadge: { alignItems: 'center', backgroundColor: Colors.primaryLight, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.md },
  countText: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.primary },
  countLabel: { fontSize: FontSize.xs, color: Colors.primary },
  scroll: { padding: Spacing.md, paddingBottom: 40 },
  infoBox: {
    flexDirection: 'row', gap: Spacing.sm,
    backgroundColor: Colors.primaryLight, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
  },
  infoText: { flex: 1, fontSize: FontSize.sm, color: Colors.primary, lineHeight: 18 },
  card: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: Spacing.sm },
  builderNoteCard: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  builderNoteText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22, marginBottom: Spacing.sm },
  editNoteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editNoteBtnText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.primary },
  savedMsg: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.successLight, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
  },
  savedMsgText: { flex: 1, fontSize: FontSize.sm, color: Colors.success, fontWeight: '600' },
  saveBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
  },
  saveBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
});
