import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Messages from './messages';
import { FormattedMessage } from 'components/FormattedMessage';
import { useNavigation } from '@react-navigation/core';
import Logo from '../../../tools/logo/Logo.svg';
import Facebook from '../../../tools/logo/facebook-grupos.svg';
import Google from '../../../tools/logo/google-g-2015.svg';
import Email from '../../../tools/logo/Groupe 4714.svg';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
import theme from 'theme/theme';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { setUserDetailsAction } from 'containers/UserDetails/actions';
import { setTokenAction } from 'providers/AuthProvider/actions';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface Props {}

const ExtirorSignIn = (props: Props) => {
  const dispatch = useDispatch();
  //// google awesome :
  const configureGoogle = async () => {
    try {
      await GoogleSignin.configure({
        webClientId: Platform.select({
          ios: '1073098248838-rgcmgo5s3k2qaane6n4lsgf651tvsalp.apps.googleusercontent.com',
          android:
            '1073098248838-hm0313do92vdls922j5ka1u59s67dqob.apps.googleusercontent.com',
        }),
        offlineAccess: false,
      });
    } catch (error) {
      console.log('signin google error : ' + error);
    }
  };

  useEffect(() => {
    configureGoogle();
  }, []);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const body = {
        first_name: userInfo.user.givenName,
        last_name: userInfo.user.familyName,
        email: userInfo.user.email,
        social_id: userInfo.user.id,
        image_url: userInfo.user.photo,
      };
      const accessToken = await GoogleSignin.getTokens();

      if (accessToken) {
        dispatch(setTokenAction(accessToken.accessToken));
      }
      dispatch(setUserDetailsAction(body));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow

        console.log(' user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log(' operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened

        console.log('error : ' + error);
      }
    }
  };

  /// facebook stuff ...

  const gphRequeset = async () => {
    const requestManager = new GraphRequestManager();

    const request = new GraphRequest(
      '/me?locale=en_US&fields=name,email',
      null,
      (error: any, result: any) => {
        if (result) {
          const profile = result;
          profile.avatar = `https://graph.facebook.com/${result.id}/picture`;

          const body = {
            first_name: profile.name,
            last_name: '',
            email: profile.email ? profile.email : '',
            social_id: profile.id,
            image_url: profile.avatar,
          };
          dispatch(setUserDetailsAction(body));
        } else {
          if (__DEV__) console.log(error);
        }
      },
    );

    requestManager.addRequest(request).start();
  };

  const loginWithFacebook = async () => {
    if (Platform.OS === 'android') {
      await LoginManager.setLoginBehavior('native_with_fallback');
    }
    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (login: any) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            const accessToken = data.accessToken.toString();
            if (accessToken) {
              dispatch(setTokenAction(accessToken));
            }
          });

          gphRequeset();
        }
      },
      (error: String) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translationFrom = useRef(new Animated.Value(0)).current;
  const navigation: any = useNavigation();
  const isFocused: any = useIsFocused();
  const valueXY = new Animated.ValueXY({ x: 0, y: 0 });

  const expand = () => {
    Animated.timing(valueXY, {
      toValue: {
        x: -theme.dimensions.width / 3.5,
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
  const fadIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
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
      toValue: 50,
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
  React.useEffect(() => {
    if (!isFocused) {
      fadOut();
      shrink();
      shrinkForm();
    } else {
      fadIn();
      expand();
      expandForm();
    }
  }, [isFocused]);

  const handleNext = () => navigation.navigate(SCREENS.EXTERIOR_AUTH);
  // const handleNext = () =>
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: SCREENS.EXTERIOR_AUTH }],
  //     }),
  //   );

  const signInMail = () => navigation.navigate(SCREENS.SIGNIN);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            right: 0,
            // left: 0,
            // width: '100%',
            // backgroundColor: 'pink',
            transform: valueXY.getTranslateTransform(),
          },
        ]}>
        <Logo width={180} />
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnim,

          marginTop: theme.spacing.default[10],
          transform: [{ translateY: translationFrom }],
          //   borderWidth: 1,
        }}>
        <TouchableOpacity onPress={signInGoogle} style={styles.inputContainer}>
          <Google />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.google} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={loginWithFacebook}>
          <Facebook width={40} height={30} />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.facebook} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInMail} style={styles.inputContainer}>
          <Email />
          <View style={styles.TextInput}>
            <FormattedMessage {...Messages.Mail} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          // marginTop: theme.spacing.default[5],
          marginBottom: theme.spacing.default[7],
          //  borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: theme.fontSizing.default[2],
            color: theme.palette.default.dark,
          }}>
          Vous n'avez pas de compte ?
        </Text>
        <TouchableOpacity onPress={handleNext}>
          <Text
            style={{
              fontSize: theme.fontSizing.default[2],
              marginLeft: 2,
              color: theme.palette.default.light,
            }}>
            Créer un compte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExtirorSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.default['main'],
    //   borderWidth: 1,
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
    //    fontSize: ,
    //color: 'teal',
    paddingLeft: 15,
    height: 30,
    width: '80%',
    borderRadius: 50,
    //borderWidth: 1,
    marginLeft: -25,
  },

  containerFb: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.dimensions.width * 0.7,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});
