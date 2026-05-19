import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

export default function WaitingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { visitId } = useLocalSearchParams<{ visitId: string }>();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-approve after 5 seconds for demo
  useEffect(() => {
    if (elapsed >= 5) {
      router.replace({ pathname: '/(broker)/approved', params: { visitId: visitId ?? 'visit_001' } });
    }
  }, [elapsed]);

  const formatElapsed = () => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    if (m > 0) return `${m} min ${s} sec`;
    return `${s} sec`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.spinnerBox}>
          <ActivityIndicator size={48} color={Colors.warning} />
        </View>

        <Text style={styles.title}>Waiting for approval</Text>
        <Text style={styles.subtitle}>
          Lodha Group has received your request for
        </Text>
        <Text style={styles.propName}>Park Side Tower 4 — 1203</Text>
        <Text style={styles.subtitle}>
          You will be notified the moment it's approved.
        </Text>

        <View style={styles.timerRow}>
          <Ionicons name="time-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.timerText}>Sent at 2:42 PM · {formatElapsed()} ago</Text>
        </View>

        <Text style={styles.autoApproveNote}>
          Auto-approving in {Math.max(0, 5 - elapsed)}s (demo)…
        </Text>
      </View>

      <Pressable style={styles.cancelBtn} onPress={() => router.back()}>
        <Ionicons name="close-circle-outline" size={18} color={Colors.error} />
        <Text style={styles.cancelBtnText}>Cancel request</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  topBar: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
  spinnerBox: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.warningLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl,
  },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  propName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.primary, marginVertical: 4, textAlign: 'center' },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.xl },
  timerText: { fontSize: FontSize.sm, color: Colors.textMuted },
  autoApproveNote: { fontSize: FontSize.xs, color: Colors.warning, marginTop: Spacing.md, fontWeight: '600' },
  cancelBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, padding: Spacing.lg,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  cancelBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.error },
});
