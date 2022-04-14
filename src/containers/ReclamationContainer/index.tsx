/**
 *
 * ReclamationContainer
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectReclamationContainer, {
  makeSelectBody,
  makeSelectDescription,
  makeSelectErorr,
  makeSelectLoading,
  makeSelectResponse,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import theme from 'theme/theme';
import {
  setReclamationBodyAction,
  setReclamationBodyFailAction,
  setDesriptionAction,
} from './actions';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { useNavigation } from '@react-navigation/native';
interface Props {
  CommandeDetails: any;
}
const stateSelector = createStructuredSelector({
  reclamationContainer: makeSelectReclamationContainer(),
  userDetails: makeSelectUserDetailsData,
  description: makeSelectDescription(),
  error: makeSelectErorr(),
  loading: makeSelectLoading(),
  response: makeSelectResponse(),
});

const key = 'reclamationContainer';

const ReclamationContainer = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    reclamationContainer,
    userDetails,
    description,
    error,
    loading,
    response,
  } = useSelector(stateSelector);
  const navigation = useNavigation();
  console.log('from reclamation :' + JSON.stringify(props.CommandeDetails.id));
  // console.log('from reclamationUser :' + JSON.stringify(userDetails));

  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();

  /* eslint-enable no-unused-vars */
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.length > 10) {
      dispatch(setDesriptionAction(comment));
      console.log("i'm here");

      let bodyData = {
        description: description ? description : comment,
        status: props.CommandeDetails.status,
        customerId: props.CommandeDetails.customer._id,
        orderId: props.CommandeDetails.id,
      };
      console.log(bodyData);

      dispatch(setReclamationBodyAction(bodyData));
    } else {
      dispatch(
        setReclamationBodyFailAction(
          'please write a detailed refund message .',
        ),
      );
    }
  };

  useEffect(() => {
    if (!loading && !error && response) {
      setTimeout(() => {
        navigation.setParams({
          orderId: props.CommandeDetails._id,
        });
        navigation.goBack();
      }, 350);
    }
  }, [response, error, loading]);
  return (
    <ScrollView scrollEnabled>
      <KeyboardAvoidingView
        style={{
          backgroundColor: theme.palette.default.light,
          justifyContent: 'center',
        }}
        behavior="padding"
        enabled>
        <Image
          source={require('assets/images/reclamation.png')}
          style={{
            resizeMode: 'contain',
            width: theme.dimensions.width,
          }}
        />
        <Text
          style={{
            marginVertical: 15,
            fontSize: 21,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Commande N° {props.CommandeDetails._id}
        </Text>

        <View
          style={{
            alignItems: 'center',
            height: 150,
          }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Ajouter commentaire"
            placeholderTextColor={'#999999'}
            value={comment}
            onChangeText={(e: any) => {
              setComment(e);
            }}
            style={styles.TextInput}
            multiline
          />
        </View>
        <View
          style={{
            alignItems: 'center',

            marginVertical: 25,
          }}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              height: 35,
              backgroundColor: theme.palette.default.main,
              borderRadius: (220 + 35) / 2,
            }}>
            <Text
              style={{
                color: theme.palette.default.light,
                fontSize: 18,
              }}>
              {!loading ? 'Envoyer' : 'proccessing ...'}
            </Text>
          </TouchableOpacity>
          {error && <Text>{response}</Text>}
          {!error && !loading && response?.message && (
            <Text>{response?.message}</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  TextInput: {
    //paddingVertical: 20,
    width: 350,

    textAlignVertical: 'top',
    // paddingVertical: 7,
    fontSize: 15,
    color: 'black',
    paddingLeft: 15,
    // minHeight: 80,
    borderWidth: 1,
    //textAlign: 'center',
    height: '100%',
    borderRadius: 15,
    borderColor: '#CDD4D9',
  },
});
export default ReclamationContainer;
