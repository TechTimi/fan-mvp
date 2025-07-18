import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertText,
  Center,
  Heading,
} from 'native-base';

export default function VerificationScreen({ route, navigation }: any) {
  const { phone } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerification = async () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (code === '1234') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        setError('Invalid verification code');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <Center flex={1} px={4}>
        <VStack space={4} w="100%" maxW="300px">
          <Heading size="xl" color="primary.500" textAlign="center">
            Verify Phone
          </Heading>
          <Text fontSize="md" color="gray.500" textAlign="center">
            We sent a verification code to {phone}
          </Text>

          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          ) : null}

          <Input
            value={code}
            onChangeText={setCode}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            textAlign="center"
            fontSize="lg"
            maxLength={4}
          />

          <Button
            onPress={handleVerification}
            isLoading={loading}
            isLoadingText="Verifying..."
            colorScheme="primary"
            size="lg"
          >
            Verify
          </Button>

          <Button
            variant="ghost"
            onPress={() => {}}
            colorScheme="primary"
          >
            Resend Code
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
