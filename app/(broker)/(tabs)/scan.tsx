import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MOCK_PROPERTIES } from '@/constants/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    const property = MOCK_PROPERTIES.find(p => p.qrToken === data || data.includes(p.id));
    if (property) {
      router.push({ pathname: '/(broker)/property', params: { propertyId: property.id, fromScan: '1' } });
    } else {
      router.push({ pathname: '/(broker)/property', params: { propertyId: MOCK_PROPERTIES[0].id, fromScan: '1' } });
    }
    setTimeout(() => setScanned(false), 2000);
  };

  const handleDemoScan = () => {
    router.push({ pathname: '/(broker)/property', params: { propertyId: MOCK_PROPERTIES[0].id, fromScan: '1' } });
  };

  if (!permission) {
    return <View style={styles.center}><Text>Loading…</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <View style={styles.permBox}>
          <Ionicons name="camera-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.permTitle}>Camera access needed</Text>
          <Text style={styles.permDesc}>
            MagicPass needs camera access to scan property QR codes.
          </Text>
          <Pressable style={styles.permBtn} onPress={requestPermission}>
            <Text style={styles.permBtnText}>Grant access</Text>
          </Pressable>
          <Pressable style={styles.manualBtn} onPress={() => router.push('/(broker)/manual')}>
            <Text style={styles.manualBtnText}>Enter code manually instead</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

      <View style={[styles.overlay, { paddingTop: insets.top + 16 }]}>
        <View style={styles.topBar}>
          <Text style={styles.scanTitle}>Scan property QR</Text>
          <Pressable onPress={() => setTorch(!torch)} style={styles.torchBtn}>
            <Ionicons name={torch ? 'flash' : 'flash-outline'} size={22} color={Colors.white} />
          </Pressable>
        </View>

        <View style={styles.frameArea}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
          </View>
          <Text style={styles.hint}>Point camera at the property QR sticker…</Text>
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.manualEntryBtn} onPress={() => router.push('/(broker)/manual')}>
            <Ionicons name="keypad-outline" size={16} color={Colors.white} />
            <Text style={styles.manualEntryText}>Can't scan? Enter the printed code instead</Text>
          </Pressable>
          <Pressable style={styles.demoBtn} onPress={handleDemoScan}>
            <Text style={styles.demoBtnText}>Demo: Tap to simulate scan</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
  permBox: { alignItems: 'center', maxWidth: 320 },
  permTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.md, marginBottom: Spacing.sm },
  permDesc: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  permBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, marginBottom: Spacing.sm },
  permBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.md },
  manualBtn: { paddingVertical: Spacing.sm },
  manualBtnText: { color: Colors.primary, fontWeight: '600', fontSize: FontSize.md },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  scanTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.white },
  torchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameArea: { alignItems: 'center' },
  frame: {
    width: 240,
    height: 240,
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: '#4ade80',
    borderWidth: 3,
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  hint: { color: 'rgba(255,255,255,0.75)', fontSize: FontSize.sm, textAlign: 'center' },
  bottomActions: { alignItems: 'center', paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  manualEntryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
  },
  manualEntryText: { color: Colors.white, fontSize: FontSize.sm, fontWeight: '500' },
  demoBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  demoBtnText: { color: Colors.white, fontSize: FontSize.sm, fontWeight: '600' },
});
