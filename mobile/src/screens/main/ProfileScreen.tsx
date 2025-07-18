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
  Avatar,
  Badge,
  Pressable,
  Switch,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    creditScore: 650,
    memberSince: 'January 2024',
    totalAdvances: 8,
    totalAmount: 125000,
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      title: 'Edit Profile',
      icon: 'person-outline',
      onPress: () => {},
    },
    {
      title: 'Credit Score Details',
      icon: 'analytics-outline',
      onPress: () => {},
    },
    {
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      title: 'Terms & Conditions',
      icon: 'document-text-outline',
      onPress: () => {},
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-outline',
      onPress: () => {},
    },
  ];

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView>
        <VStack space={4} p={4}>
          <Card p={6}>
            <VStack space={4} alignItems="center">
              <Avatar size="xl" bg="primary.500">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <VStack space={1} alignItems="center">
                <Heading size="lg">{userProfile.name}</Heading>
                <Text color="gray.500">{userProfile.email}</Text>
                <Text color="gray.500">{userProfile.phone}</Text>
                <Badge colorScheme="success" variant="solid" mt={2}>
                  Verified Member
                </Badge>
              </VStack>
            </VStack>
          </Card>

          <Card p={4}>
            <VStack space={3}>
              <Heading size="md">Credit Score</Heading>
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="primary.500">
                    {userProfile.creditScore}
                  </Text>
                  <Text fontSize="sm" color="gray.500">Good</Text>
                </VStack>
                <Box w="60%" h="2" bg="gray.200" rounded="full">
                  <Box 
                    w={`${(userProfile.creditScore / 850) * 100}%`} 
                    h="2" 
                    bg="primary.500" 
                    rounded="full" 
                  />
                </Box>
              </HStack>
            </VStack>
          </Card>

          <HStack space={4}>
            <Card flex={1} p={4}>
              <VStack space={1} alignItems="center">
                <Text fontSize="xl" fontWeight="bold" color="success.500">
                  {userProfile.totalAdvances}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Total Advances
                </Text>
              </VStack>
            </Card>
            <Card flex={1} p={4}>
              <VStack space={1} alignItems="center">
                <Text fontSize="xl" fontWeight="bold" color="primary.500">
                  ₦{userProfile.totalAmount.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Total Amount
                </Text>
              </VStack>
            </Card>
          </HStack>

          <Card p={4}>
            <VStack space={3}>
              <Heading size="md">Settings</Heading>
              
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                  <Ionicons name="notifications-outline" size={20} color="gray" />
                  <Text>Push Notifications</Text>
                </HStack>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  colorScheme="primary"
                />
              </HStack>

              <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                  <Ionicons name="location-outline" size={20} color="gray" />
                  <Text>Location Services</Text>
                </HStack>
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  colorScheme="primary"
                />
              </HStack>
            </VStack>
          </Card>

          <Card p={4}>
            <VStack space={3}>
              <Heading size="md">Account</Heading>
              {menuItems.map((item, index) => (
                <Pressable key={index} onPress={item.onPress}>
                  <HStack space={3} alignItems="center" py={2}>
                    <Ionicons name={item.icon as any} size={20} color="gray" />
                    <Text flex={1}>{item.title}</Text>
                    <Ionicons name="chevron-forward" size={16} color="gray" />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Card>

          <Button
            onPress={handleLogout}
            colorScheme="error"
            variant="outline"
            leftIcon={<Ionicons name="log-out-outline" size={16} color="#ef4444" />}
          >
            Logout
          </Button>

          <Text fontSize="xs" color="gray.400" textAlign="center" mt={4}>
            Member since {userProfile.memberSince}
          </Text>
        </VStack>
      </ScrollView>
    </Box>
  );
}
