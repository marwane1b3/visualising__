import { Platform, Linking, Alert } from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

type point = {
  latitude: number;
  longitude: number;
};

export const GET_POSITION_RESPONSES = {
  SUCCESS: 1,
  ASK_FOR_GPS_ENABLE: 2,
  REQUEST_AUTHORISATION: 3,
};

export const getGPSPosition = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await getNavigatorCurrentLocation(false);
      if (location) {
        resolve({ code: GET_POSITION_RESPONSES.SUCCESS, location });
      }
    } catch (e) {
      if (e.code == e.POSITION_UNAVAILABLE) {
        resolve({ code: GET_POSITION_RESPONSES.ASK_FOR_GPS_ENABLE });
      } else {
        try {
          resolve({ code: GET_POSITION_RESPONSES.REQUEST_AUTHORISATION });
        } catch (e) {
          reject(e);
        }
      }
    }
  });
};

const getNavigatorCurrentLocation = async (
  tryAccurate: boolean,
): Promise<GeolocationResponse> => {
  const options = tryAccurate
    ? { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 }
    : { enableHighAccuracy: false, timeout: 5000, maximumAge: 3600000 };
  return new Promise((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        options,
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const checkAddressInZone = (
  { latitude, longitude }: point,
  cities: Array<any>,
) => {
  const customerCurrentCity = cities.reduce(
    (accumulator: object, city: any) => {
      return geolib.isPointInPolygon(
        { latitude, longitude },
        city.cityLocations,
      )
        ? {
            ...city,
            inZone: true,
          }
        : accumulator;
    },
    {
      inZone: false,
    },
  );

  return customerCurrentCity?.inZone
    ? {
        latitude,
        longitude,
        cityId: customerCurrentCity._id,
        cityName: customerCurrentCity.name,
        inZone: customerCurrentCity.inZone,
        gpsActive: true,
      }
    : {
        latitude,
        longitude,
        inZone: false,
        gpsActive: true,
      };
};

export const askForGpsEnableAndroid = async () => {
  return new Promise(async (resolve, reject) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        // console.log(data);
				resolve(data);
      })
      .catch((err) => {
				reject(err)
			});
  });
};

export const askForGpsEnableIOS = async () => {
  Alert.alert(
    'Location Off',
    'The location is off',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          if (Linking.canOpenURL('App-Prefs:root=Privacy&path=LOCATION')) {
            Linking.openURL('App-Prefs:root=Privacy&path=LOCATION');
          } else {
            Linking.openURL('app-settings:');
          }
        },
      },
    ],
    { cancelable: false },
  );
};

export const requestAuthorisation = () => {
	Geolocation.requestAuthorization();
}

export default {
  getGPSPosition,
  checkAddressInZone,
};
