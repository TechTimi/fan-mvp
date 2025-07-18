import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Card,
  ScrollView,
  Heading,
  Badge,
  Pressable,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

let MapView, Marker;
if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
}

const mockStations = [
  {
    id: 'station_001',
    name: 'Total Energies Victoria Island',
    address: 'Plot 1684, Sanusi Fafunwa Street, Victoria Island, Lagos',
    distance: '2.3 km',
    rating: 4.5,
    fuelTypes: ['PMS', 'AGO', 'DPK'],
    isOpen: true,
    coordinates: { latitude: 6.4281, longitude: 3.4219 },
  },
  {
    id: 'station_002',
    name: 'Mobil Ikeja',
    address: 'Allen Avenue, Ikeja, Lagos State',
    distance: '5.1 km',
    rating: 4.2,
    fuelTypes: ['PMS', 'AGO'],
    isOpen: true,
    coordinates: { latitude: 6.6018, longitude: 3.3515 },
  },
  {
    id: 'station_003',
    name: 'Shell Lekki',
    address: 'Lekki-Epe Expressway, Lekki Phase 1, Lagos',
    distance: '8.7 km',
    rating: 4.7,
    fuelTypes: ['PMS', 'AGO', 'DPK', 'LPG'],
    isOpen: true,
    coordinates: { latitude: 6.4474, longitude: 3.5562 },
  },
];

export default function StationFinderScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredStations, setFilteredStations] = useState(mockStations);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredStations(mockStations);
    } else {
      const filtered = mockStations.filter(station =>
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStations(filtered);
    }
  };

  const StationCard = ({ station }: any) => (
    <Pressable>
      <Card p={4} mb={3}>
        <VStack space={2}>
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1} space={1}>
              <Heading size="sm">{station.name}</Heading>
              <Text fontSize="sm" color="gray.500" numberOfLines={2}>
                {station.address}
              </Text>
            </VStack>
            <Badge colorScheme={station.isOpen ? 'success' : 'error'} variant="solid">
              {station.isOpen ? 'Open' : 'Closed'}
            </Badge>
          </HStack>

          <HStack space={2} flexWrap="wrap">
            {station.fuelTypes.map((fuel: string) => (
              <Badge key={fuel} variant="outline" colorScheme="primary">
                {fuel}
              </Badge>
            ))}
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={1} alignItems="center">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text fontSize="sm">{station.rating}</Text>
            </HStack>
            <HStack space={1} alignItems="center">
              <Ionicons name="location-outline" size={16} color="gray" />
              <Text fontSize="sm" color="gray.500">{station.distance}</Text>
            </HStack>
            <Button size="sm" variant="outline" colorScheme="primary">
              Select
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <VStack space={4} p={4} flex={1}>
        <HStack space={2} alignItems="center">
          <Input
            flex={1}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search stations..."
            InputLeftElement={
              <Box ml={2}>
                <Ionicons name="search" size={20} color="gray" />
              </Box>
            }
          />
          <Button
            variant={showMap ? 'solid' : 'outline'}
            colorScheme="primary"
            onPress={() => setShowMap(!showMap)}
            leftIcon={<Ionicons name="map-outline" size={16} color={showMap ? 'white' : '#2196f3'} />}
          >
            {Platform.OS === 'web' ? 'Map (Mobile Only)' : 'Map'}
          </Button>
        </HStack>

        {showMap ? (
          <Box flex={1} rounded="lg" overflow="hidden">
            {Platform.OS !== 'web' ? (
              <MapView
                style={{ flex: 1 }}
                region={userLocation}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {filteredStations.map((station) => (
                  <Marker
                    key={station.id}
                    coordinate={station.coordinates}
                    title={station.name}
                    description={station.address}
                  />
                ))}
              </MapView>
            ) : (
              <Box flex={1} bg="gray.100" justifyContent="center" alignItems="center" p={4}>
                <VStack space={3} alignItems="center">
                  <Ionicons name="map-outline" size={48} color="gray" />
                  <Heading size="md" color="gray.600">Map View</Heading>
                  <Text textAlign="center" color="gray.500">
                    Interactive map is available on mobile devices. 
                    Use the list view below to browse stations.
                  </Text>
                </VStack>
              </Box>
            )}
          </Box>
        ) : (
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <VStack space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Heading size="md">Nearby Stations</Heading>
                <Text fontSize="sm" color="gray.500">
                  {filteredStations.length} found
                </Text>
              </HStack>
              {filteredStations.map((station) => (
                <StationCard key={station.id} station={station} />
              ))}
            </VStack>
          </ScrollView>
        )}
      </VStack>
    </Box>
  );
}
