import React, { ReactNode, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import theme from 'theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  actionTitle: string;
  failedActionTitle: string;
  showModal: any;
  setShowModal: any;
  successAction: any;
  failedAction: any;
  pickedAddress: any;
  children?: ReactNode;
}

const ChooseModal = (props: Props) => {
  const {
    showModal,
    setShowModal,
    successAction,
    failedAction,
    children,
    title,
    actionTitle,
    failedActionTitle,
    pickedAddress,
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      {/*<TouchableWithoutFeedback*/}
      {/*  style={{ backgroundColor: 'yellow' }}*/}
      {/*  onPress={() => setShowModal(false)}>*/}
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={{
              // borderBottomColor: '#aaaaaa80',
              // borderBottomWidth: 1,
              // padding: theme.spacing.default[3],
              paddingTop: 50,
              paddingBottom: 40,
              paddingHorizontal: 40,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 24,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              // resizeMode="stretch"
              source={{
                uri: 'https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:e2760aeb-aabc-4057-907d-9d72bcf8ba69;revision=3?component_id=af659736-0cb6-40e4-a5e1-10d15d1ad12a&api_key=CometServer1&access_token=1627074587_urn%3Aaaid%3Asc%3AUS%3Ae2760aeb-aabc-4057-907d-9d72bcf8ba69%3Bpublic_148ddf6bea5f0f05799ee5bf052f6352be961e2d',
              }}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                padding: 20,
                textAlign: 'center',
              }}>
              Voulez-vous vraiment commander depuis cette adresse ?
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#F7F7F7',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#CDD4D9',
              marginHorizontal: 15,
            }}>
            <Ionicons
              name="location-outline"
              style={{
                fontSize: 25,
                color: '#2F423C',
                paddingVertical: 5,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                paddingVertical: 10,
                textAlign: 'center',
              }}>
              pickedAddress.address
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              onPress={successAction}
              style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#28B873',
                borderRadius: 50,
                marginHorizontal: 40,
                marginVertical: 5,
              }}>
              <Text style={{ color: 'white' }}>{actionTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={failedAction}
              style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 50,
                marginHorizontal: 40,
                marginVertical: 5,
              }}>
              <Text style={{ color: '#28B873' }}>{failedActionTitle}</Text>
            </TouchableOpacity>
          </View>
          {/*{children && (*/}
          {/*  <View style={styles.childrenContainer}>{children}</View>*/}
          {/*)}*/}
          {/*<View style={styles.actionButtonContainer}>*/}
          {/*  <View*/}
          {/*    style={{*/}
          {/*      flexDirection: 'row',*/}
          {/*      justifyContent: 'flex-start',*/}
          {/*      padding: 20,*/}
          {/*    }}>*/}
          {/*    <View*/}
          {/*      style={{*/}
          {/*        flex: 1,*/}
          {/*      }}>*/}
          {/*      <TouchableOpacity*/}
          {/*        onPress={mainAction}*/}
          {/*        style={{*/}
          {/*          alignItems: 'center',*/}
          {/*          padding: 10,*/}
          {/*          backgroundColor: '#28B873',*/}
          {/*          borderRadius: 50,*/}
          {/*        }}>*/}
          {/*        <Text style={{ color: 'white' }}>{actionTitle}</Text>*/}
          {/*      </TouchableOpacity>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>
      </View>
      {/*</TouchableWithoutFeedback>*/}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.default.light,
    // backgroundColor: 'red',
    borderRadius: 5,
    //width: theme.dimensions.width - 80,
    // padding: theme.spacing.default[4],
  },
  mainContainer: {
    backgroundColor: '#00000080',
    // backgroundColor: 'green',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  actionButtonContainer: {
    borderTopColor: '#aaaaaa80',
    borderTopWidth: 1,
  },
  childrenContainer: {
    padding: theme.spacing.default[2],
  },
});
export default ChooseModal;

/** */
