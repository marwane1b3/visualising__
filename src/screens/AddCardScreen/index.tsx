/**
 *
 * AddCardScreen
 *
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectAddCardScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundCheckbox from 'rn-round-checkbox';
import { SCREENS } from '../../navigators/constants';
import { useNavigation } from '@react-navigation/core';

const stateSelector = createStructuredSelector({
  addCardScreen: makeSelectAddCardScreen(),
});
const key = 'addCardScreen';

export const AddCardScreen: React.FC<IAddCardScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { addCardScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const [cardType, setCardType] = useState('national');
  const [defaultCard, setDefaultCard] = useState(true);
  const navigation = useNavigation();
  const navigateToCheckout = () => {
    navigation.navigate(SCREENS.CHECKOUT);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          paddingTop: 40,
          paddingHorizontal: 15,
          backgroundColor: '#ffffff',
        }}>
        <TouchableOpacity onPress={navigateToCheckout}>
          <Icon
            style={{ padding: 5, paddingRight: 10 }}
            name="arrow-left"
            size={20}
            color="#28B873"
          />
        </TouchableOpacity>

        <Text
          style={{
            padding: 2,
            color: '#2F423C',
            fontSize: 19,
            fontWeight: '700',
          }}>
          Ajouter une carte
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          paddingTop: 5,
          paddingHorizontal: 15,
          backgroundColor: '#ffffff',
        }}>
        <TextInput
          style={{
            borderColor: '#00000024',
            borderBottomWidth: 1,
            flex: 1,
            marginHorizontal: 5,
            fontSize: 15,
            height: 50,
          }}
          placeholder={'Numero du carte'}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#ffffff',
        }}>
        <TextInput
          style={{
            borderColor: '#00000024',
            borderBottomWidth: 1,
            flex: 1,
            marginHorizontal: 5,
            fontSize: 15,
            height: 50,
          }}
          placeholder={"Valide jusqu'au"}
        />
        <TextInput
          style={{
            borderColor: '#00000024',
            borderBottomWidth: 1,
            flex: 1,
            marginHorizontal: 5,
            fontSize: 15,
            height: 50,
          }}
          placeholder={'CVV'}
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 20,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: cardType == 'national' ? '#28B873' : '#999999',
            }}>
            Carte national
          </Text>
          <RoundCheckbox
            size={22}
            checked={cardType == 'national'}
            onValueChange={(checked: any) => {
              if (checked) setCardType('national');
            }}
            icon={'checkmark'}
            backgroundColor={'#28B873'}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: cardType == 'internationale' ? '#28B873' : '#999999',
            }}>
            Carte internationale
          </Text>
          <RoundCheckbox
            size={22}
            checked={cardType == 'internationale'}
            onValueChange={(checked: any) => {
              if (checked) setCardType('internationale');
            }}
            icon={'checkmark'}
            backgroundColor={'#28B873'}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 20,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: defaultCard ? '#28B873' : '#999999',
            }}>
            Définir comme principale
          </Text>
          <Switch
            trackColor={{ false: '#c3c3c3', true: '#dedede' }}
            thumbColor={defaultCard ? '#28B873' : '#CDD4D9'}
            ios_backgroundColor="#3e3e3e"
            value={defaultCard}
            onValueChange={(checked) => {
              setDefaultCard(checked);
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 15,
          backgroundColor: '#ffffff',
          flex: 1,
        }}>
        <View
          style={{
            marginVertical: 20,
          }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 12,
              textAlign: 'justify',
            }}>
            {`L'ajout d'une carte consiste à effectuer un paiement du 1dh avec authentification 3D secure, le montant sera automatiquement remboursé.`}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Icon
            style={{ paddingRight: 5 }}
            name="shield"
            size={20}
            color="#28B873"
          />
          <Text style={{ fontSize: 13, color: '#2F423C' }}>
            Les information de votre carte resteront confidentielles
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export interface IAddCardScreenProps {}

export default AddCardScreen;
