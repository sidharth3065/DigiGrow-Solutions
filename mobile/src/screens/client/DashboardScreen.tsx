import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

interface DashboardData {
  mrr: number;
  activeServices: any[];
}

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/client/dashboard');
      setData(res.data);
    } catch (error) {
      console.log('Error fetching dashboard', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={data?.activeServices || []}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{user?.name}</Text>
            
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Spend (MRR)</Text>
              <Text style={styles.statValue}>{formatCurrency(data?.mrr || 0)}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Active Services</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.serviceName}>{item.serviceType.replace(/_/g, ' ')}</Text>
              <View style={[styles.badge, item.status === 'ACTIVE' ? styles.badgeActive : styles.badgeInactive]}>
                <Text style={[styles.badgeText, item.status === 'ACTIVE' ? styles.badgeTextActive : styles.badgeTextInactive]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.serviceDesc}>Service is running smoothly. Tap for details via Web.</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No active services found.</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F1A' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F1A' },
  header: { marginBottom: 24 },
  greeting: { fontSize: 16, color: '#7B83A1' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  statCard: {
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.3)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  statLabel: { color: '#C8CDE0', fontSize: 16, marginBottom: 8 },
  statValue: { color: '#00D2FF', fontSize: 36, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  listContent: { padding: 20 },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#2A3050',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  serviceName: { fontSize: 18, fontWeight: 'bold', color: '#E8ECF4', textTransform: 'capitalize' },
  serviceDesc: { fontSize: 14, color: '#7B83A1' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeActive: { backgroundColor: 'rgba(0, 230, 118, 0.15)' },
  badgeInactive: { backgroundColor: 'rgba(255, 183, 77, 0.15)' },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  badgeTextActive: { color: '#00E676' },
  badgeTextInactive: { color: '#FFB74D' },
  emptyText: { color: '#7B83A1', textAlign: 'center', marginTop: 40 },
});
