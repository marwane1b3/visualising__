import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

interface Props {}

const Favoris = (props: Props) => {
  const renderItem = (items: any) => (
    <View style={{ padding: 10 }}>
      <Image
        source={{ uri: items.item.uri }}
        style={{ width: 150, height: 80 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tmpData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default Favoris;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
const tmpData = [
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
  {
    uri: 'https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841',
  },
];
