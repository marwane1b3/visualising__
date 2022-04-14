import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from 'theme/colors';
import theme from 'theme/theme';

interface Props {
  service: any;
  handlePress: any;
}

const ServiceComponent = (props: Props) => {
  const { service, handlePress } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: service.iconUrl,
        }}
        style={styles.iconStyle}
        width={50}
        height={50}
      />

      <Text style={styles.nameStyle} numberOfLines={2}>
        {service.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //padding: 6,
    maxWidth: theme.dimensions.width / 4 - 10,
    // backgroundColor: 'red',
  },
  iconStyle: {
    resizeMode: 'contain',
  },
  nameStyle: {
    color: theme.palette.default.dark,
    fontSize: 15,
  },
});
export default ServiceComponent;
