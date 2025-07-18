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
  Badge,
} from 'native-base';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
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
            Welcome to FAN
          </Heading>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Sign in to your account
          </Text>

          <Alert status="info" variant="left-accent">
            <AlertIcon />
            <VStack space={1}>
              <AlertText fontWeight="bold">Demo Mode - Test Credentials:</AlertText>
              <Text fontSize="xs">Email: demo@fan.com</Text>
              <Text fontSize="xs">Password: demo123</Text>
            </VStack>
          </Alert>

          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          ) : null}

          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </FormControl>

          <Button
            onPress={handleLogin}
            isLoading={loading}
            isLoadingText="Signing in..."
            colorScheme="primary"
            size="lg"
          >
            Sign In
          </Button>

          <HStack justifyContent="center" space={2}>
            <Text fontSize="sm" color="gray.500">
              Don't have an account?
            </Text>
            <Link
              _text={{ color: 'primary.500', fontSize: 'sm' }}
              onPress={() => navigation.navigate('Register')}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
}
