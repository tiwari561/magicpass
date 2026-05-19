import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

export default function RoleSelection() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#1a56db', '#1239a5']} style={styles.container}>
      <View style={styles.logoArea}>
        <View style={styles.logoBox}>
          <Ionicons name="qr-code" size={40} color={Colors.white} />
        </View>
        <Text style={styles.appName}>MagicPass</Text>
        <Text style={styles.tagline}>QR Visitor Management for Real Estate</Text>
      </View>

      <View style={styles.cards}>
        <RoleCard
          icon="phone-portrait-outline"
          title="I'm a Broker"
          description="Scan QR codes, request property visits & track approvals"
          onPress={() => router.push({ pathname: '/login', params: { role: 'broker' } })}
          light
        />
        <RoleCard
          icon="business-outline"
          title="I'm a Builder"
          description="Approve visits, manage properties & monitor broker activity"
          onPress={() => router.push({ pathname: '/login', params: { role: 'builder' } })}
        />
      </View>

      <Text style={styles.footer}>GenieRealty · EstateKey</Text>
    </LinearGradient>
  );
}

function RoleCard({ icon, title, description, onPress, light }: any) {
  return (
    <Pressable
      style={[styles.card, light && styles.cardLight]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
    >
      <View style={[styles.iconBox, light && styles.iconBoxLight]}>
        <Ionicons name={icon} size={28} color={light ? Colors.primary : Colors.white} />
      </View>
      <View style={styles.cardText}>
        <Text style={[styles.cardTitle, !light && styles.cardTitleLight]}>{title}</Text>
        <Text style={[styles.cardDesc, !light && styles.cardDescLight]}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={light ? Colors.primary : 'rgba(255,255,255,0.7)'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: Spacing.lg,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  tagline: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
  },
  cards: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardLight: {
    backgroundColor: Colors.white,
    borderColor: 'transparent',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxLight: {
    backgroundColor: Colors.primaryLight,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 3,
  },
  cardTitleLight: {
    color: Colors.text,
  },
  cardDesc: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },
  cardDescLight: {
    color: Colors.textSecondary,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: FontSize.xs,
    marginTop: Spacing.xxl,
  },
});
