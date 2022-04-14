import React, { memo, useState } from 'react';
import
{
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import SearchBar from 'components/SearchBar';
import theme from 'theme/theme';
import Caret from '../../../tools/logo/Icon awesome-caret-down.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { NAVIGATORS, SCREENS } from 'navigators/constants';
interface Props { }

const HomeHeaderComponent = memo( ( props: Props ) =>
{
  return (
    <SafeAreaView>
      <SearchBar />
    </SafeAreaView>
  );
} );

export default HomeHeaderComponent;

const styles = StyleSheet.create( {} );
