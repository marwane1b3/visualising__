import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Location from 'react-native-vector-icons/Ionicons';
import { getMapAction } from './actions';
import { mapShowSelector } from './selectors';
import { createStructuredSelector } from 'reselect';

import { useIsFocused } from '@react-navigation/native';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import User from 'react-native-vector-icons/SimpleLineIcons';
interface Props {
  handleMap: Function;
  showMap: boolean;
}

const stateSelector = createStructuredSelector({
  flag: mapShowSelector(),
});

const MapHandler = (props: Props) => {
  const dispatch = useDispatch();
  const { flag } = useSelector(stateSelector);
  //useEffect(() => console.log('effectFlag', flag), [flag]);
  return (
    <TouchableOpacity onPress={() => props.handleMap()}>
      <Location
        name="location"
        size={21}
        color={props.showMap ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message:
          'kaalix App needs access to your location ' +
          'so we can send your request.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return Promise.resolve(true);
    } else {
      console.log('Location permission denied');
      return Promise.reject(false);
    }
  } catch (err) {
    console.log(err);
  }
};

export const MinimapView = () => {
  const [currentLocation, setCurrentLocation] = React.useState<LatLng>({
    latitude: 33.590573,
    longitude: -7.546139,
  });
  const [defaultLocation, setDefaultLocation] = React.useState<LatLng>({
    latitude: 33.590573,
    longitude: -7.546139,
  });
  const isFocused: any = useIsFocused();
  const mapElement = React.useRef<MapView>(null);

  useEffect(() => {
    if (isFocused) {
      try {
        requestLocationPermission().then(() => {
          Geolocation.getCurrentPosition(
            (info) => {
              console.log('from currentposition', JSON.stringify(info.coords));
              setDefaultLocation(info.coords);
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true },
          );

          Geolocation.watchPosition(
            (position) => {
              console.log('from watchPosition', position.coords);
              setCurrentLocation(position.coords);
            },
            (error) => {
              console.log(error);
            },
          );
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (mapElement && mapElement.current) {
      mapElement.current.animateCamera(
        {
          center: {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          zoom: 14,
        },
        {
          duration: 600,
        },
      );
      return;
    }
  }, [currentLocation]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapElement}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
          onPress={() => {
            console.log('map test');
          }}
          zoomControlEnabled={true}
          zoomEnabled={true}>
          {currentLocation && (
            <Marker
              coordinate={{
                ...currentLocation,
              }}
              onPress={() => {
                console.log('test');
              }}>
              <View style={{ padding: 10 }}>
                <User name="user" style={{ color: 'red' }} />
              </View>
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
};

export default MapHandler;

const styles = StyleSheet.create({
  container: {
    marginLeft: 14,
    width: 250,
    height: 150,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
