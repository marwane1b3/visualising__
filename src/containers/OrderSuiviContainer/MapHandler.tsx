import React, { useEffect } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';

import Location from 'react-native-vector-icons/Ionicons';

import { createStructuredSelector } from 'reselect';
import io from 'socket.io-client';
import { useIsFocused } from '@react-navigation/native';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import User from 'react-native-vector-icons/SimpleLineIcons';
import theme from 'theme/theme';
import Bike from '../../../assets/icons/Bike.svg';

interface Props {
  destinationLocation: any;
}
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
const MapHandler = (props: Props) => {
  const [currentLocation, setCurrentLocation] = React.useState<LatLng>({
    latitude: 33.590573,
    longitude: -7.546139,
  });
  const [defaultLocation, setDefaultLocation] = React.useState<LatLng>({
    latitude: 33.590573,
    longitude: -7.546139,
  });
  const [destinationLocation, setDestinationLocation] = React.useState<LatLng>({
    latitude: props.destinationLocation[0],
    longitude: props.destinationLocation[1],
  });
  const isFocused: any = useIsFocused();
  const mapElement = React.useRef<MapView>(null);

  // useEffect(() => {
  //   if (mapElement && mapElement.current) {
  //     mapElement.current.animateCamera(
  //       {
  //         center: {
  //           latitude: currentLocation.latitude,
  //           longitude: currentLocation.longitude,
  //         },
  //         zoom: 14,
  //       },
  //       {
  //         duration: 600,
  //       },
  //     );
  //     return;
  //   }
  // }, [currentLocation]);

  // useEffect(() => {
  //   if (mapElement.current) {
  //     // list of _id's must same that has been provided to the identifier props of the Marker
  //     mapElement.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
  //   }
  // }, [markers]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapElement}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...defaultLocation,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        onPress={() => {
          console.log('map test');
        }}
        zoomControlEnabled={true}
        zoomEnabled={true}
        onMapReady={() => {
          setTimeout(() => {
            mapElement.current &&
              mapElement.current.fitToSuppliedMarkers(['mk1', 'mk2'], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              });
          }, 250);
        }}>
        {currentLocation && (
          <Marker
            coordinate={{
              ...currentLocation,
            }}
            onPress={() => {
              console.log('testing');
            }}
            identifier={'mk1'}>
            <View style={{ padding: 10 }}>
              <Bike width={50} height={50} />
            </View>
          </Marker>
        )}
        {props.destinationLocation.length > 0 && (
          <Marker
            coordinate={{
              ...destinationLocation,
            }}
            onPress={() => {
              console.log('testing');
            }}
            identifier={'mk2'}>
            <View style={{ padding: 10 }}>
              <User name="user" style={{ color: 'red' }} size={15} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default MapHandler;

const styles = StyleSheet.create({
  container: {
    width: theme.dimensions.width,
    height: 200,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// useEffect(() => {
//   if (isFocused) {
//     try {
//       requestLocationPermission().then(() => {
//         Geolocation.getCurrentPosition(
//           (info) => {
//             console.log('from currentposition', JSON.stringify(info.coords));
//             setDefaultLocation(info.coords);
//           },
//           (error) => {
//             console.log(error);
//           },
//           { enableHighAccuracy: true },
//         );

//         Geolocation.watchPosition(
//           (position) => {
//             console.log('from watchPosition', position.coords);
//             setCurrentLocation(position.coords);
//           },
//           (error) => {
//             console.log(error);
//           },
//         );
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }, [isFocused]);
