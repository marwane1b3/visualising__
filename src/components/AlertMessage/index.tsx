import useTheme from 'hooks/useTheme';
import { closeAlertAction } from 'providers/AlertsProvider/actions';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from 'components/ActionButton';

export type AlertMessageType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'default'
  | null;

const icons = {
  success: 'checkbox-marked-circle-outline', // success,
  error: 'close-circle-outline', // error,
  info: 'information-variant', // Info,
  warning: 'alert-circle-outline', // warning,
  default: 'alert-octagram', // Info,
};

export interface IAlertMessageProps {
  type?: AlertMessageType;
  iconType?: AlertMessageType | 'none';
  title?: string;
  message?: string;
  id?: string;
  gravity?: 'top' | 'bottom' | 'center';
  autoHide?: boolean;
  duration?: number;
  description?: string;
  /**
   * onShow: () => {},
   * onClose: () => {},
   * onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
   * onPress: () => {},
   * props: {} // any custom props passed to the Toast component
   */
}

const ANIMATION_DURATION = 300;

export const AlertMessage: React.FC<IAlertMessageProps> = ({
  id,
  type,
  title,
  message,
  gravity,
  autoHide = true,
  duration = 2000,
  iconType,
}) => {
  const { color } = useTheme();
  const animation = useSharedValue(0);
  const dispatch = useDispatch();

  const [alertHeight, setAlertHeight] = useState(0);
  const [alertPadding, setAlertPadding] = useState(8);

  useEffect(() => {
    animation.value = 1;

    if (autoHide) {
      setTimeout(() => {
        closeAlert();
      }, duration);
    }
  }, []);

  function closeAlert() {
    animation.value = 0;
    setTimeout(() => {
      dispatch(closeAlertAction({ alertId: id, gravity }));
    }, ANIMATION_DURATION);
  }

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: alertHeight
        ? withTiming(animation.value * alertHeight, {
            duration: ANIMATION_DURATION,
          })
        : undefined,
      opacity: withTiming(
        animation.value,
        {
          duration: ANIMATION_DURATION,
        },
        (finished) => {
          // animation.value = 1;
          // if (finished) {
          //   console.log('ANIMATION ENDED');
          // } else {
          //   console.log('ANIMATION GOT CANCELLED');
          // }
        },
      ),

      marginVertical: withTiming(animation.value * 4, {
        duration: ANIMATION_DURATION,
      }),
    };
  });

  return (
    <Animated.View
      onLayout={(event) => {
        setAlertHeight(event.nativeEvent.layout.height);
      }}
      style={[
        styles.container,
        animationStyle,
        {
          backgroundColor: color[type || 'contrast'], // success error info warning
        },
      ]}>
      <View style={styles.headerContainer}>
        {iconType !== 'none' && (
          <Icon
            name={icons[iconType || type || 'default']} // Info
            size={25}
            color={color.background}
            style={styles.icon}
          />
        )}
        {title && (
          <Text
            style={[
              styles.title,
              {
                color: color.background,
              },
            ]}>
            {title}
          </Text>
        )}
      </View>

      <Text
        style={[
          {
            color: color.background,
          },
          styles.message,
        ]}>
        {message}
      </Text>

      <View style={styles.actionsContainer}>
        <ActionButton title="Undo" textColor={color.background} />
        {/* <ActionButton title="Retry" textColor={color.background} /> */}
        <ActionButton
          title="close"
          textColor={color.background}
          onPress={closeAlert}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 4,

    marginHorizontal: 12,
    marginVertical: 4,

    elevation: 3,
  },
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  icon: {
    // paddingRight: 4,
    // paddingLeft: 8,
  },
  title: {
    paddingHorizontal: 4,
    // paddingVertical: 8,
    fontWeight: 'bold',
  },
  message: { paddingHorizontal: 12 },
  actionsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    marginRight: 4,
  },
});

export default memo(AlertMessage, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
