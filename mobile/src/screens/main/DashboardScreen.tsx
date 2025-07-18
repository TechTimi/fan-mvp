import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  Heading,
  ScrollView,
  Badge,
  Pressable,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }: any) {
  const [userStats, setUserStats] = useState({
    creditScore: 650,
    availableCredit: 25000,
    pendingAdvances: 2,
    totalAdvances: 8,
  });

  const quickActions = [
    {
      title: 'Request Advance',
      icon: 'card-outline',
      color: 'primary.500',
      onPress: () => navigation.navigate('Advance'),
    },
    {
      title: 'Find Stations',
      icon: 'location-outline',
      color: 'success.500',
      onPress: () => navigation.navigate('Stations'),
    },
    {
      title: 'View History',
      icon: 'time-outline',
      color: 'warning.500',
      onPress: () => navigation.navigate('History'),
    },
    {
      title: 'Profile',
      icon: 'person-outline',
      color: 'secondary.500',
      onPress: () => navigation.navigate('Profile'),
    },
  ];

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView>
        <VStack space={4} p={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Heading size="lg">Welcome back!</Heading>
              <Text color="gray.500">Ready for your next fuel advance?</Text>
            </VStack>
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </HStack>

          <Card p={4} bg="primary.500">
            <VStack space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="white" fontSize="sm">Credit Score</Text>
                <Badge colorScheme="success" variant="solid">
                  Good
                </Badge>
              </HStack>
              <Heading size="2xl" color="white">
                {userStats.creditScore}
              </Heading>
              <Text color="primary.100" fontSize="sm">
                Available Credit: ₦{userStats.availableCredit.toLocaleString()}
              </Text>
            </VStack>
          </Card>

          <HStack space={4}>
            <Card flex={1} p={4}>
              <VStack space={1}>
                <Text fontSize="sm" color="gray.500">Pending</Text>
                <Heading size="lg" color="warning.500">
                  {userStats.pendingAdvances}
                </Heading>
                <Text fontSize="xs" color="gray.400">Advances</Text>
              </VStack>
            </Card>
            <Card flex={1} p={4}>
              <VStack space={1}>
                <Text fontSize="sm" color="gray.500">Total</Text>
                <Heading size="lg" color="success.500">
                  {userStats.totalAdvances}
                </Heading>
                <Text fontSize="xs" color="gray.400">Advances</Text>
              </VStack>
            </Card>
          </HStack>

          <VStack space={3}>
            <Heading size="md">Quick Actions</Heading>
            <VStack space={2}>
              {quickActions.map((action, index) => (
                <Pressable key={index} onPress={action.onPress}>
                  <Card p={4}>
                    <HStack space={3} alignItems="center">
                      <Box
                        w={10}
                        h={10}
                        bg={action.color}
                        rounded="full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Ionicons name={action.icon as any} size={20} color="white" />
                      </Box>
                      <Text fontSize="md" fontWeight="medium">
                        {action.title}
                      </Text>
                      <Box flex={1} />
                      <Ionicons name="chevron-forward" size={20} color="gray" />
                    </HStack>
                  </Card>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}
