import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../lib/api';

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInvoices = async () => {
    try {
      const res = await api.get('/client/invoices');
      setInvoices(res.data.invoices || []);
    } catch (error) {
      console.log('Error fetching invoices', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
  };

  const payInvoice = async (id: string) => {
    try {
      await api.post(`/client/invoices/${id}/pay`);
      fetchInvoices();
    } catch (e) {
      console.log('Failed to pay invoice', e);
    }
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
        data={invoices}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
           <Text style={styles.title}>Billing History</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.invoiceId}>INV-{item.id.slice(-6).toUpperCase()}</Text>
              <Text style={styles.amount}>{formatCurrency(item.total)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.serviceName}>{item.project?.serviceType || 'General Service'}</Text>
              <View style={[styles.badge, item.status === 'PAID' ? styles.badgePaid : styles.badgePending]}>
                <Text style={[styles.badgeText, item.status === 'PAID' ? styles.textPaid : styles.textPending]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.date}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            
            {item.status !== 'PAID' && (
              <TouchableOpacity 
                style={styles.payButton}
                onPress={() => payInvoice(item.id)}
              >
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No invoices found.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F1A' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F1A' },
  listContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#2A3050',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  invoiceId: { color: '#E8ECF4', fontSize: 16, fontWeight: 'bold' },
  amount: { color: '#00D2FF', fontSize: 18, fontWeight: 'bold' },
  serviceName: { color: '#7B83A1', fontSize: 14, textTransform: 'capitalize' },
  date: { color: '#7B83A1', fontSize: 12, marginTop: 12 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgePaid: { backgroundColor: 'rgba(0, 230, 118, 0.15)' },
  badgePending: { backgroundColor: 'rgba(255, 82, 82, 0.15)' },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  textPaid: { color: '#00E676' },
  textPending: { color: '#FF5252' },
  payButton: {
    marginTop: 16,
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  emptyText: { color: '#7B83A1', textAlign: 'center', marginTop: 40 },
});
