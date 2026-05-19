import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import FloorRow from '@/components/FloorRow';
import { MOCK_PROPERTIES } from '@/constants/mockData';

const VISIT_TYPES = ['Right now', 'Schedule'];

export default function PropertyInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId, fromScan } = useLocalSearchParams<{ propertyId: string; fromScan: string }>();
  const [visitType, setVisitType] = useState<'Right now' | 'Schedule'>('Right now');
  const [note, setNote] = useState('');

  const property = MOCK_PROPERTIES.find(p => p.id === propertyId) ?? MOCK_PROPERTIES[0];
  const availableFloors = property.floors.filter(f => f.status === 'available');

  const handleRequest = () => {
    router.push({ pathname: '/(broker)/waiting', params: { visitId: 'visit_006', propertyId: property.id } });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        {fromScan && (
          <View style={styles.scannedBadge}>
            <Ionicons name="qr-code" size={14} color={Colors.primary} />
            <Text style={styles.scannedText}>QR Scanned</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.propHeader}>
          <View style={styles.propTitleRow}>
            <View>
              <Text style={styles.propName}>{property.name}</Text>
              <Text style={styles.propLocality}>
                <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                {' '}{property.locality} · {property.builderName}
              </Text>
            </View>
            <StatusBadge status="available" />
          </View>

          <View style={styles.propMeta}>
            <MetaItem icon="bed-outline" value={property.accommodation} />
            <MetaItem icon="resize-outline" value={`${property.coveredArea.toLocaleString()} sq.ft`} />
            <MetaItem icon="construct-outline" value={property.constructionStatus} />
            <MetaItem icon="compass-outline" value={property.facing} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FLOORS AVAILABLE TO SHOW</Text>
          {property.floors.map(floor => (
            <FloorRow key={floor.code} floor={floor} strikethrough />
          ))}
        </View>

        {property.builderNote ? (
          <View style={styles.builderNoteBox}>
            <Ionicons name="information-circle" size={16} color={Colors.primary} />
            <View style={styles.builderNoteText}>
              <Text style={styles.builderNoteLabel}>BUILDER NOTE</Text>
              <Text style={styles.builderNoteValue}>{property.builderNote}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VISIT TYPE</Text>
          <View style={styles.visitTypeRow}>
            {VISIT_TYPES.map(t => (
              <Pressable
                key={t}
                style={[styles.visitTypeBtn, visitType === t && styles.visitTypeBtnActive]}
                onPress={() => setVisitType(t as any)}
              >
                <Ionicons
                  name={t === 'Right now' ? 'flash-outline' : 'calendar-outline'}
                  size={16}
                  color={visitType === t ? Colors.primary : Colors.textSecondary}
                />
                <Text style={[styles.visitTypeBtnText, visitType === t && styles.visitTypeBtnTextActive]}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTE FOR BUILDER (OPTIONAL)</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder={`e.g. "Bringing buyer from Bangalore for site visit"`}
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.caretakerRow}>
          <Ionicons name="person-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.caretakerText}>
            Caretaker: {property.caretakerName} · {property.caretakerPhone}
          </Text>
        </View>

        <Pressable style={styles.requestBtn} onPress={handleRequest}>
          <Ionicons name="checkmark-circle-outline" size={20} color={Colors.white} />
          <Text style={styles.requestBtnText}>Request visit</Text>
        </Pressable>

        <Text style={styles.footerNote}>Most builders approve within 2 minutes</Text>
      </ScrollView>
    </View>
  );
}

function MetaItem({ icon, value }: { icon: any; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Ionicons name={icon} size={14} color={Colors.textSecondary} />
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  scannedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm, paddingVertical: 4,
    borderRadius: Radius.full,
  },
  scannedText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: '600' },
  scroll: { padding: Spacing.md, paddingBottom: 40 },
  propHeader: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  propTitleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: Spacing.md },
  propName: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  propLocality: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  propMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.background, paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.full },
  metaValue: { fontSize: FontSize.sm, color: Colors.textSecondary },
  section: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: Spacing.sm },
  builderNoteBox: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  builderNoteText: { flex: 1 },
  builderNoteLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.primary, letterSpacing: 0.6, marginBottom: 2 },
  builderNoteValue: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },
  visitTypeRow: { flexDirection: 'row', gap: Spacing.sm },
  visitTypeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xs,
    height: 44, borderRadius: Radius.md, borderWidth: 1.5,
    borderColor: Colors.border, backgroundColor: Colors.background,
  },
  visitTypeBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  visitTypeBtnText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary },
  visitTypeBtnTextActive: { color: Colors.primary },
  noteInput: {
    backgroundColor: Colors.background, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: FontSize.md, color: Colors.text,
    borderWidth: 1, borderColor: Colors.border, minHeight: 80, textAlignVertical: 'top',
  },
  caretakerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.lg },
  caretakerText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  requestBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg, height: 56,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  requestBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
  footerNote: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted },
});
