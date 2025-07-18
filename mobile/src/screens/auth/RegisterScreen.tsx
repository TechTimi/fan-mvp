import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  FormControl,
  Link,
  Alert,
  AlertIcon,
  AlertText,
  Center,
  Heading,
  ScrollView,
} from 'native-base';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigation.navigate('Verification', { phone: formData.phone });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <ScrollView>
        <Center flex={1} px={4} py={8}>
          <VStack space={4} w="100%" maxW="300px">
            <Heading size="xl" color="primary.500" textAlign="center">
              Create Account
            </Heading>
            <Text fontSize="md" color="gray.500" textAlign="center">
              Join FAN today
            </Text>

            {error ? (
              <Alert status="error">
                <AlertIcon />
                <AlertText>{error}</AlertText>
              </Alert>
            ) : null}

            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                value={formData.firstName}
                onChangeText={(value) => setFormData({ ...formData, firstName: value })}
                placeholder="Enter your first name"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                value={formData.lastName}
                onChangeText={(value) => setFormData({ ...formData, lastName: value })}
                placeholder="Enter your last name"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                value={formData.phone}
                onChangeText={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={formData.password}
                onChangeText={(value) => setFormData({ ...formData, password: value })}
                placeholder="Enter your password"
                secureTextEntry
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                value={formData.confirmPassword}
                onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
                placeholder="Confirm your password"
                secureTextEntry
              />
            </FormControl>

            <Button
              onPress={handleRegister}
              isLoading={loading}
              isLoadingText="Creating account..."
              colorScheme="primary"
              size="lg"
            >
              Create Account
            </Button>

            <HStack justifyContent="center" space={2}>
              <Text fontSize="sm" color="gray.500">
                Already have an account?
              </Text>
              <Link
                _text={{ color: 'primary.500', fontSize: 'sm' }}
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Link>
            </HStack>
          </VStack>
        </Center>
      </ScrollView>
    </Box>
  );
}
