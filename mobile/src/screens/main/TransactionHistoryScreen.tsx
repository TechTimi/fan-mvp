import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  ScrollView,
  Heading,
  Badge,
  Card,
  Select,
  CheckIcon,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const mockTransactions = [
  {
    id: 'txn_001',
    type: 'advance',
    amount: 15000,
    status: 'completed',
    station: 'Total Energies Victoria Island',
    fuelType: 'PMS',
    date: '2024-01-15T10:30:00Z',
    reference: 'FAN_ADV_001',
  },
  {
    id: 'txn_002',
    type: 'payment',
    amount: 15375,
    status: 'completed',
    station: 'Total Energies Victoria Island',
    fuelType: 'PMS',
    date: '2024-01-15T11:00:00Z',
    reference: 'FAN_PAY_001',
  },
  {
    id: 'txn_003',
    type: 'advance',
    amount: 25000,
    status: 'pending',
    station: 'Shell Lekki',
    fuelType: 'AGO',
    date: '2024-01-16T09:15:00Z',
    reference: 'FAN_ADV_002',
  },
  {
    id: 'txn_004',
    type: 'advance',
    amount: 12000,
    status: 'rejected',
    station: 'Mobil Ikeja',
    fuelType: 'PMS',
    date: '2024-01-14T14:20:00Z',
    reference: 'FAN_ADV_003',
  },
];

export default function TransactionHistoryScreen() {
  const [filter, setFilter] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === 'all') {
      setFilteredTransactions(mockTransactions);
    } else {
      setFilteredTransactions(mockTransactions.filter(txn => txn.status === value));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'advance' ? 'arrow-up-circle' : 'arrow-down-circle';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const TransactionCard = ({ transaction }: any) => (
    <Card p={4} mb={3}>
      <VStack space={3}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <HStack space={3} alignItems="center" flex={1}>
            <Box
              w={10}
              h={10}
              bg={transaction.type === 'advance' ? 'primary.500' : 'success.500'}
              rounded="full"
              justifyContent="center"
              alignItems="center"
            >
              <Ionicons 
                name={getTypeIcon(transaction.type)} 
                size={20} 
                color="white" 
              />
            </Box>
            <VStack flex={1} space={1}>
              <Text fontSize="md" fontWeight="medium">
                {transaction.type === 'advance' ? 'Fuel Advance' : 'Payment'}
              </Text>
              <Text fontSize="sm" color="gray.500" numberOfLines={1}>
                {transaction.station}
              </Text>
            </VStack>
          </HStack>
          <VStack alignItems="flex-end" space={1}>
            <Text fontSize="lg" fontWeight="bold">
              {transaction.type === 'advance' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
            </Text>
            <Badge colorScheme={getStatusColor(transaction.status)} variant="solid">
              {transaction.status}
            </Badge>
          </VStack>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <HStack space={4}>
            <HStack space={1} alignItems="center">
              <Ionicons name="calendar-outline" size={14} color="gray" />
              <Text fontSize="xs" color="gray.500">
                {formatDate(transaction.date)}
              </Text>
            </HStack>
            <HStack space={1} alignItems="center">
              <Ionicons name="car-outline" size={14} color="gray" />
              <Text fontSize="xs" color="gray.500">
                {transaction.fuelType}
              </Text>
            </HStack>
          </HStack>
          <Text fontSize="xs" color="gray.400">
            {transaction.reference}
          </Text>
        </HStack>
      </VStack>
    </Card>
  );

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <VStack space={4} p={4} flex={1}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="lg">Transaction History</Heading>
          <Select
            selectedValue={filter}
            onValueChange={handleFilterChange}
            placeholder="Filter"
            w="120px"
            _selectedItem={{
              bg: 'primary.100',
              endIcon: <CheckIcon size="5" />,
            }}
          >
            <Select.Item label="All" value="all" />
            <Select.Item label="Completed" value="completed" />
            <Select.Item label="Pending" value="pending" />
            <Select.Item label="Rejected" value="rejected" />
          </Select>
        </HStack>

        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack space={2}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <Card p={8}>
                <VStack space={2} alignItems="center">
                  <Ionicons name="document-outline" size={48} color="gray" />
                  <Text fontSize="lg" fontWeight="medium" color="gray.500">
                    No transactions found
                  </Text>
                  <Text fontSize="sm" color="gray.400" textAlign="center">
                    Your transaction history will appear here
                  </Text>
                </VStack>
              </Card>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
