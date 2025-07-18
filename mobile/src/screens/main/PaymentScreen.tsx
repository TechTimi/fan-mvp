import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  ScrollView,
  Heading,
  Radio,
  Alert,
  AlertIcon,
  AlertText,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentScreen({ route, navigation }: any) {
  const { advanceId, amount } = route.params || { advanceId: 'ADV_001', amount: 15000 };
  const [selectedProvider, setSelectedProvider] = useState('paystack');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const processingFee = amount * 0.025;
  const totalAmount = amount + processingFee;

  const paymentProviders = [
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Pay with card, bank transfer, or USSD',
      icon: 'card-outline',
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Multiple payment options available',
      icon: 'wallet-outline',
    },
  ];

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      navigation.navigate('Dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView>
        <VStack space={4} p={4}>
          <Card p={4}>
            <VStack space={3}>
              <Heading size="md">Payment Summary</Heading>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Advance Amount:</Text>
                <Text fontWeight="medium">₦{amount.toLocaleString()}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Processing Fee (2.5%):</Text>
                <Text fontWeight="medium">₦{processingFee.toLocaleString()}</Text>
              </HStack>
              <Box borderTopWidth={1} borderColor="gray.200" pt={2}>
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg">Total Amount:</Text>
                  <Text fontWeight="bold" fontSize="lg" color="primary.500">
                    ₦{totalAmount.toLocaleString()}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </Card>

          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          ) : null}

          <Card p={4}>
            <VStack space={3}>
              <Heading size="md">Select Payment Method</Heading>
              <Radio.Group
                value={selectedProvider}
                onChange={setSelectedProvider}
                name="paymentProvider"
              >
                <VStack space={3}>
                  {paymentProviders.map((provider) => (
                    <Radio key={provider.id} value={provider.id}>
                      <HStack space={3} alignItems="center" flex={1}>
                        <Box
                          w={10}
                          h={10}
                          bg="primary.100"
                          rounded="full"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Ionicons name={provider.icon as any} size={20} color="#2196f3" />
                        </Box>
                        <VStack flex={1}>
                          <Text fontWeight="medium">{provider.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {provider.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </Radio>
                  ))}
                </VStack>
              </Radio.Group>
            </VStack>
          </Card>

          <Card p={4} bg="blue.50">
            <VStack space={2}>
              <HStack space={2} alignItems="center">
                <Ionicons name="shield-checkmark" size={20} color="#2196f3" />
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Secure Payment
                </Text>
              </HStack>
              <Text fontSize="sm" color="blue.600">
                Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
              </Text>
            </VStack>
          </Card>

          <VStack space={3}>
            <Button
              onPress={handlePayment}
              isLoading={loading}
              isLoadingText="Processing payment..."
              colorScheme="primary"
              size="lg"
              leftIcon={<Ionicons name="card" size={16} color="white" />}
            >
              Pay ₦{totalAmount.toLocaleString()}
            </Button>

            <Button
              variant="ghost"
              onPress={() => navigation.goBack()}
              colorScheme="gray"
            >
              Cancel
            </Button>
          </VStack>

          <Text fontSize="xs" color="gray.400" textAlign="center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </Text>
        </VStack>
      </ScrollView>
    </Box>
  );
}
