import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import PropertyCard from '@/components/PropertyCard';
import { MOCK_PROPERTIES } from '@/constants/mockData';

const CONSTRUCTION_STATUS = ['Pre-launch', 'Booking', 'Under Construction', 'Nearing Completion', 'Ready to Move'];
const ACCOMMODATION = ['2 BHK', '3 BHK', '4 BHK', '5 BHK'];

export default function BrowseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedAccom, setSelectedAccom] = useState<string[]>([]);

  const filtered = MOCK_PROPERTIES.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.locality.toLowerCase().includes(search.toLowerCase()) ||
      p.builderName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !selectedStatus.length || selectedStatus.includes(p.constructionStatus);
    const matchAccom = !selectedAccom.length || selectedAccom.includes(p.accommodation);
    return matchSearch && matchStatus && matchAccom;
  });

  const toggleStatus = (s: string) =>
    setSelectedStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAccom = (a: string) =>
    setSelectedAccom(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const activeFilters = selectedStatus.length + selectedAccom.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Properties</Text>
        <Text style={styles.subtitle}>
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} · from builders who approved you
        </Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locality, builder…"
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
        <Pressable
          style={[styles.filterBtn, activeFilters > 0 && styles.filterBtnActive]}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Ionicons name="options-outline" size={18} color={activeFilters > 0 ? Colors.primary : Colors.textSecondary} />
          {activeFilters > 0 && <Text style={styles.filterCount}>{activeFilters}</Text>}
        </Pressable>
      </View>

      {showFilter && (
        <View style={styles.filterPanel}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>CONSTRUCTION STATUS</Text>
            <View style={styles.chipRow}>
              {CONSTRUCTION_STATUS.map(s => (
                <Pressable
                  key={s}
                  style={[styles.chip, selectedStatus.includes(s) && styles.chipActive]}
                  onPress={() => toggleStatus(s)}
                >
                  <Text style={[styles.chipText, selectedStatus.includes(s) && styles.chipTextActive]}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>ACCOMMODATION</Text>
            <View style={styles.chipRow}>
              {ACCOMMODATION.map(a => (
                <Pressable
                  key={a}
                  style={[styles.chip, selectedAccom.includes(a) && styles.chipActive]}
                  onPress={() => toggleAccom(a)}
                >
                  <Text style={[styles.chipText, selectedAccom.includes(a) && styles.chipTextActive]}>{a}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.filterActions}>
            <Pressable onPress={() => { setSelectedStatus([]); setSelectedAccom([]); }}>
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
            <Pressable style={styles.applyBtn} onPress={() => setShowFilter(false)}>
              <Text style={styles.applyText}>Show {filtered.length} results</Text>
            </Pressable>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map(prop => (
          <PropertyCard
            key={prop.id}
            property={prop}
            onPress={() => router.push({ pathname: '/(broker)/property-detail', params: { propertyId: prop.id } })}
          />
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={40} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No properties found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    flexDirection: 'row',
    gap: 2,
  },
  filterBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  filterCount: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.primary },
  filterPanel: {
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: Spacing.md,
  },
  filterSection: { marginBottom: Spacing.md },
  filterLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  filterActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  clearText: { fontSize: FontSize.md, color: Colors.error, fontWeight: '600' },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  applyText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.md },
  list: { padding: Spacing.md },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginTop: Spacing.md },
  emptySubtext: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 4 },
});
