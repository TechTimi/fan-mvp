import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  Select,
  CheckIcon,
  Alert,
  AlertIcon,
  AlertText,
  ScrollView,
  Heading,
  Card,
  HStack,
  Slider,
} from 'native-base';

export default function AdvanceRequestScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    amount: 10000,
    stationId: '',
    fuelType: '',
    purpose: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const maxAmount = 50000;
  const minAmount = 5000;

  const handleSubmit = async () => {
    if (!formData.stationId || !formData.fuelType) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.amount < minAmount || formData.amount > maxAmount) {
      setError(`Amount must be between ₦${minAmount.toLocaleString()} and ₦${maxAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Advance request submitted successfully!');
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 2000);
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
          <Heading size="lg">Request Fuel Advance</Heading>

          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          ) : null}

          {success ? (
            <Alert status="success">
              <AlertIcon />
              <AlertText>{success}</AlertText>
            </Alert>
          ) : null}

          <Card p={4}>
            <VStack space={4}>
              <FormControl isRequired>
                <FormControl.Label>Amount</FormControl.Label>
                <VStack space={2}>
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    ₦{formData.amount.toLocaleString()}
                  </Text>
                  <Slider
                    value={formData.amount}
                    minValue={minAmount}
                    maxValue={maxAmount}
                    step={1000}
                    onChange={(value) => setFormData({ ...formData, amount: value })}
                    colorScheme="primary"
                  >
                    <Slider.Track>
                      <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm" color="gray.500">
                      ₦{minAmount.toLocaleString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ₦{maxAmount.toLocaleString()}
                    </Text>
                  </HStack>
                </VStack>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Fuel Station</FormControl.Label>
                <Select
                  selectedValue={formData.stationId}
                  onValueChange={(value) => setFormData({ ...formData, stationId: value })}
                  placeholder="Select a station"
                  _selectedItem={{
                    bg: 'primary.100',
                    endIcon: <CheckIcon size="5" />,
                  }}
                >
                  <Select.Item label="Total Energies Victoria Island" value="station_001" />
                  <Select.Item label="Mobil Ikeja" value="station_002" />
                  <Select.Item label="Shell Lekki" value="station_003" />
                  <Select.Item label="Conoil Surulere" value="station_004" />
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Fuel Type</FormControl.Label>
                <Select
                  selectedValue={formData.fuelType}
                  onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                  placeholder="Select fuel type"
                  _selectedItem={{
                    bg: 'primary.100',
                    endIcon: <CheckIcon size="5" />,
                  }}
                >
                  <Select.Item label="Premium Motor Spirit (PMS)" value="PMS" />
                  <Select.Item label="Automotive Gas Oil (AGO)" value="AGO" />
                  <Select.Item label="Dual Purpose Kerosene (DPK)" value="DPK" />
                  <Select.Item label="Liquefied Petroleum Gas (LPG)" value="LPG" />
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Purpose (Optional)</FormControl.Label>
                <Input
                  value={formData.purpose}
                  onChangeText={(value) => setFormData({ ...formData, purpose: value })}
                  placeholder="e.g., Business trip, daily commute"
                  multiline
                  numberOfLines={3}
                />
              </FormControl>
            </VStack>
          </Card>

          <Card p={4} bg="blue.50">
            <VStack space={2}>
              <Text fontSize="sm" fontWeight="medium" color="blue.700">
                Advance Summary
              </Text>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Amount:</Text>
                <Text fontWeight="medium">₦{formData.amount.toLocaleString()}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Processing Fee:</Text>
                <Text fontWeight="medium">₦{(formData.amount * 0.025).toLocaleString()}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600" fontWeight="bold">Total:</Text>
                <Text fontWeight="bold">₦{(formData.amount * 1.025).toLocaleString()}</Text>
              </HStack>
            </VStack>
          </Card>

          <Button
            onPress={handleSubmit}
            isLoading={loading}
            isLoadingText="Submitting request..."
            colorScheme="primary"
            size="lg"
          >
            Submit Request
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}
