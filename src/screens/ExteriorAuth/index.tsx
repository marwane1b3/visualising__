import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Messages from './messages';
import { FormattedMessage } from 'components/FormattedMessage';
import { useNavigation } from '@react-navigation/core';
import Logo from '../../../tools/logo/Logo.svg';
import Facebook from '../../../tools/logo/facebook-grupos.svg';
import Google from '../../../tools/logo/google-g-2015.svg';
import Email from '../../../tools/logo/Groupe 4714.svg';
import { SCREENS } from 'navigators/constants';
import theme from 'theme/theme';
import { useIsFocused } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

interface Props {}

const ExteriorAuth = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const valueXY = new Animated.ValueXY({ x: 0, y: 0 });
  const translationFrom = useRef(new Animated.Value(0)).current;
  const isFocused: any = useIsFocused();
  const navigation: any = useNavigation();

  const expand = () => {
    Animated.timing(valueXY, {
      toValue: {
        x: theme.dimensions.width / 4,
        y: theme.dimensions.height / 6,
      },
      duration: 450,
      useNativeDriver: true,
    }).start();
  };

  const expandForm = () => {
    Animated.timing(translationFrom, {
      toValue: -50,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  const shrink = () => {
    Animated.timing(valueXY, {
      toValue: { x: 0, y: 0 },
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  const shrinkForm = () => {
    Animated.timing(translationFrom, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  const fadOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };

  const fadIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isFocused) {
      expandForm();
      fadIn();
      expand();
    } else {
      shrinkForm();
      fadOut();
      shrink();
    }
  }, [isFocused]);

  const handleNext = () => navigation.navigate(SCREENS.EXTERIOR_SIGNIN);

  const signupMail = () => navigation.navigate(SCREENS.REGISTER);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            position: 'absolute',
            top: 0,
            left: 0,
            //marginBottom: 50,
            transform: valueXY.getTranslateTransform(),
          },
        ]}>
        <Logo width={180} />
      </Animated.View>
      <Animated.View
        style={{
          marginTop: theme.spacing.default[10],

          transform: [{ translateY: translationFrom }],
          opacity: fadeAnim,
        }}>
        <View style={styles.inputContainer}>
          <Google />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.google} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Facebook width={40} height={30} />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.facebook} />
          </View>
        </View>
        <TouchableOpacity onPress={signupMail} style={styles.inputContainer}>
          <Email />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.Mail} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          //   marginTop: theme.spacing.default[5],
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
  );
};

export default ExteriorAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.default['main'],
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    //  marginTop: 15,
    marginRight: 15,
    marginVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#CDD4D9',
    height: 50,
    width: '80%',
  },
  TextInput: {
    fontSize: 23,
    color: 'teal',
    paddingLeft: 15,
    height: 30,
    width: '80%',
    borderRadius: 50,
    //borderWidth: 1,
    marginLeft: -25,
  },
});
