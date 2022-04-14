import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
import { SuggestionData } from './constants';
import theme from 'theme/theme';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectErrorPubMessage,
  makeSelectpublicityGroupTabsState,
} from 'containers/AdBannierContainer/selectors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MICROSERVICE_BASE_URL } from 'utils';
import { SCREENS } from 'navigators/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {}
const stateSelector = createStructuredSelector({
  SuggestionData: makeSelectpublicityGroupTabsState(),
  errorMsg: makeSelectErrorPubMessage(),
});
const index = (props: Props) => {
  const { SuggestionData, errorMsg } = useSelector(stateSelector);
  const navigation = useNavigation();
  const getSuggestions = (suggestions: any) => {
    const publicityGroups = suggestions.publicitySubGroups;

    const onlySuggestions = publicityGroups[1];
    return onlySuggestions?.pubs ? onlySuggestions?.pubs : null;
  };
  const [cleanUp, setCleanUp] = React.useState(false);
  useEffect(() => {
    setCleanUp(true);
    return () => {
      setCleanUp(false);
    };
  }, []);

  const handlePress = async (item: any) => {
    if (item.type === 'Store') {
      fetch(`${MICROSERVICE_BASE_URL.CONTENT}/store/${item.storeId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((body: any) => {
          navigation.navigate(SCREENS.ITEMS_LIST, {
            storeDetails: body,
          });
        })
        .catch((err) => console.log('error ', err));
    } else {
      await Linking.openURL(item.externalLink).catch((err) =>
        console.error('oops : ', err),
      );
    }
  };

  const renderItem = (items: any) => (
    <TouchableOpacity
      onPress={() => {
        handlePress(items.item);
      }}
      style={{ padding: 10 }}>
      <ImageBackground
        source={{ uri: items.item.imageUrl }}
        style={{
          width: 150,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: 150,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: theme.palette.default.light,
            }}>
            {items.item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.SuggestionScreenStyle}>
      {Object.keys(SuggestionData).length > 0 &&
        errorMsg.length === 0 &&
        cleanUp && (
          <View style={styles.container}>
            <FlatList
              data={getSuggestions(SuggestionData)}
              renderItem={renderItem}
              keyExtractor={(item: any, index: number) =>
                `_key${index.toString()}`
              }
              listKey={`_ID +${Math.random().toString(16).slice(2)}`}
              numColumns={2}
            />
          </View>
        )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  SuggestionScreenStyle: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 5,
  },
});
