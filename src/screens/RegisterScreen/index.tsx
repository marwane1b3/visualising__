/**
 *
 * RegisterScreen
 *
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'components/FormattedMessage';
// import messages from './messages';
import Logo from '../../../tools/logo/Logo.svg';
import {} from './selectors';
import { useNavigation } from '@react-navigation/core';
import {} from './actions';
import RegisterForm from 'containers/RegisterForm';
import theme from 'theme/theme';
import { SCREENS } from 'navigators/constants';

const stateSelector = createStructuredSelector({});

const key = 'registerScreen';

export const RegisterScreen: React.FC<IRegisterScreenProps> = ({}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  // const {} = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  const navigation: any = useNavigation();

  const handleNext = () => navigation.navigate(SCREENS.EXTERIOR_SIGNIN);

  return (
    <ScrollView scrollEnabled contentContainerStyle={styles.container}>
      <View style={[{ marginBottom: 15 }]}>
        <Logo width={180} />
      </View>

      <View
        style={{
          //  borderWidth: 1,
          width: theme.dimensions.width,
          justifyContent: 'center',
          alignItems: 'center',
          //  flex: 1,
          paddingHorizontal: 12,
        }}>
        <RegisterForm />
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.spacing.default[5],
            marginBottom: theme.spacing.default[7],
          }}>
          <Text
            style={{
              fontSize: theme.fontSizing.default[2],
              color: theme.palette.default.dark,
            }}>
            Vous avez un compte ?
          </Text>
          <TouchableOpacity onPress={handleNext}>
            <Text
              style={{
                fontSize: theme.fontSizing.default[2],
                marginLeft: 2,
                color: theme.palette.default.light,
              }}>
              Connectez vous
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: theme.palette.default.main,
  },
});

export interface IRegisterScreenProps {}

export default RegisterScreen;
