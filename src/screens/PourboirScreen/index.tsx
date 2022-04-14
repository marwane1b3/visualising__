import PourboirContainer from 'containers/PourboirContainer';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import theme from 'theme/theme';
import { donations } from './constants';

interface Props {}

const PourboirScreen = (props: any) => {
  const { CommandeDetails } = props.route.params;
  console.log('From pourboir Screen', CommandeDetails);
  const [values, setValues] = useState([{}]);
  const [selectedDonation, setSelectedDonation] = useState([
    {
      id: '',
      value: '',
      isSelect: false,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setValues(donations);
  }, []);

  const checkPayment = () => {};
  const selectedValue = (item: any) => {
    let fulList: any;
    let selectedList: any;
    fulList = donations.map((b: any) => {
      if (b.value === item.value) {
        return {
          id: item.id,
          value: item.value,

          isSelect: !item.isSelect,
        };
      } else {
        return {
          id: b.id,
          value: b.value,

          isSelect: false,
        };
      }
    });
    setValues(fulList);
    if (selectedDonation?.map((a: any) => a.value).includes(item.value)) {
      selectedList = [
        {
          id: '',
          value: '',
          isSelect: false,
        },
      ];
    } else {
      selectedList = [
        {
          id: item.id,
          value: item.value,

          isSelect: !item.isSelect,
        },
      ];
    }

    setSelectedDonation(selectedList);
  };

  const renderItem = (items: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectedValue(items.item);
        }}
        style={{
          margin: 5,
          elevation: 1,

          borderWidth: 0.5,
          borderColor: theme.palette.default.main,
          borderRadius: 45 / 2,
          backgroundColor: items.item.isSelect
            ? theme.palette.default.main
            : theme.palette.default.light,
          //flexDirection: 'row',
          //alignItems: 'center',
          // justifyContent: 'space-between',
          width: 150,
        }}>
        <Text
          style={{
            marginVertical: 15,
            fontSize: 21,
            fontWeight: 'bold',
            textAlign: 'center',
            color: items.item.isSelect
              ? theme.palette.default.light
              : theme.palette.default.main,
          }}>
          {items.item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.default.light }}>
      <Image
        source={require('assets/images/Pourboir.png')}
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
        Commande N° {CommandeDetails._id}
      </Text>

      <FlatList
        numColumns={2}
        data={values}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 15,

          flex: 1,
        }}
        renderItem={renderItem}
        keyExtractor={(items: any, index: number) => index.toString()}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 220,
            height: 35,
            backgroundColor: theme.palette.default.main,
            borderRadius: (220 + 35) / 2,
          }}
          onPress={() => {
            if (selectedDonation[0]?.value?.length === 0) {
              setError('Veuiller choisir une option');
              setTimeout(() => {
                setError('');
              }, 2250);
            } else {
              setError('');
              setShowModal(true);
            }
          }}>
          <Text
            style={{
              color: theme.palette.default.light,
              fontSize: 18,
            }}>
            {showModal ? 'proccessing...' : 'Verifier'}
          </Text>
        </TouchableOpacity>
        {error.length > 0 && (
          <View
            style={{
              marginTop: 15,
              borderWidth: 1,
              borderColor: 'red',
              borderRadius: 15,
              padding: 5,
            }}>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {error}
            </Text>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
          // dispatch(getModalShowAction(false));
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
          onPressOut={() => {
            setShowModal(false);
          }}>
          <TouchableOpacity style={styles.panel} activeOpacity={1}>
            <PourboirContainer
              donation={
                selectedDonation[0]?.value ? selectedDonation[0]?.value : ''
              }
              deliveryManId={CommandeDetails?.deliveryMan[0]?._id}
              customerId={CommandeDetails?.customer?._id}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* {selectedDonation.length > 0 && <Text>{selectedDonation[0].value}</Text>} */}
    </View>
  );
};

export default PourboirScreen;

const styles = StyleSheet.create({
  panel: {
    //padding: 20,
    //backgroundColor: '#FFFFFF',
    // paddingTop: 20,
    backgroundColor: theme.palette.default.light,

    width: '100%',
    height: 200,

    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
