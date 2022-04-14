import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import theme from 'theme/theme';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { selectedTimeOption } from './constants';
import {
  DeliveryTimeOptionsSelector,
  DateSelector,
  modalSelector,
} from './selectors';
import {
  setTimeDeliveryOption,
  requestTimeDeliveryOptionAction,
  getDateAction,
  getModalShowAction,
} from './actions';
import DatePicker from 'react-native-date-picker';
import { boolean } from 'yup/lib/locale';

const key = 'DeliveryTimeContainer';
interface Props {
  selectedDeliveryTimeOption: any;
  selectedDate: any;
  setTimeDeliveryOption: Function;
  getDateAction: Function;
}
const stateSelector = createStructuredSelector({
  selectedDeliveryTime: DeliveryTimeOptionsSelector(),
  selectedDate: DateSelector(),
  modalVisible: modalSelector(),
});

const DeliveryTimeContainer = (props: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (
      props.selectedDeliveryTimeOption[1]?.name === 'Planifier' &&
      props.selectedDeliveryTimeOption[1]?.isSelect
    ) {
      // dispatch(getModalShowAction(true));
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [props.selectedDeliveryTimeOption]);
  const handleSelectedTime = (obj: any) => {
    let fulList;
    fulList = props.selectedDeliveryTimeOption.map((b: any) => {
      if (b.name === obj.name) {
        return {
          name: obj.name,
          isSelect: !obj.isSelect,
        };
      } else {
        return {
          name: b.name,
          isSelect: !b.isSelect,
        };
      }
    });
    if (obj.name == 'Planifier' && date) {
      setModalVisible(false);
    } else {
      dispatch(props.setTimeDeliveryOption(selectedTimeOption));
      dispatch(props.getDateAction(''));
    }
    dispatch(props.setTimeDeliveryOption(fulList));
  };

  return (
    <>
      <Text style={[styles.DeliveryTimeOptionTitleStyle, styles.cardTitle]}>
        Heure de livraison
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {props.selectedDeliveryTimeOption.length > 0 && (
          <>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                flex: 1,
                backgroundColor: props.selectedDeliveryTimeOption[0].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.light,
                borderWidth: 1,
                borderColor: '#707070',
                justifyContent: 'center',
                marginHorizontal: 5,
              }}
              onPress={() => {
                handleSelectedTime(props.selectedDeliveryTimeOption[0]);
              }}>
              <Text
                numberOfLines={1}
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  fontSize: 16,
                  textAlign: 'center',
                  color: props.selectedDeliveryTimeOption[0].isSelect
                    ? theme.palette.default.light
                    : theme.palette.default.main,
                }}>
                Maintenant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                flex: 1,
                borderWidth: 1,
                borderColor: '#707070',
                backgroundColor: props.selectedDeliveryTimeOption[1].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.light,
                // borderRadius: 18,
                justifyContent: 'center',
                marginHorizontal: 5,
              }}
              onPress={() => {
                handleSelectedTime(props.selectedDeliveryTimeOption[1]);
              }}>
              <Text
                numberOfLines={1}
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  fontSize: 16,
                  textAlign: 'center',
                  color: props.selectedDeliveryTimeOption[1].isSelect
                    ? theme.palette.default.light
                    : theme.palette.default.main,
                  // fontSize: theme.fontSizing.default[3],
                }}>
                {props.selectedDate &&
                !props.selectedDeliveryTimeOption[0].isSelect
                  ? props.selectedDate?.toDateString()
                  : 'Planifier'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          // dispatch(getModalShowAction(false));
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
          onPressOut={() => {
            // dispatch(getModalShowAction(false));
            dispatch(props.setTimeDeliveryOption(selectedTimeOption));

            setModalVisible(false);
          }}>
          <View style={styles.panel}>
            <DatePicker
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                //  backgroundColor: 'red',
                width: theme.dimensions.width,
              }}
              date={date}
              fadeToColor="none"
              minimumDate={new Date()}
              locale="fr-FR"
              onDateChange={setDate}
              maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            />

            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => {
                dispatch(props.getDateAction(date));
                setModalVisible(false);
                // dispatch(getModalShowAction(false));
              }}>
              <Text style={styles.panelButtonTitle}>Valider</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DeliveryTimeContainer;

const styles = StyleSheet.create({
  DeliveryTimeOptionTitleStyle: {
    //fontSize: 23,
    ///paddingBottom: 10,
  },
  panel: {
    //padding: 20,
    //backgroundColor: '#FFFFFF',
    // paddingTop: 20,
    backgroundColor: theme.palette.default.light,
    //  flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    borderWidth: 1,
    width: '100%',
    height: 250,
    elevation: 5,
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panelHeader: {
    alignItems: 'center',
  },

  panelTitle: {
    fontSize: 22,
    height: 35,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.palette.default.main,
    alignItems: 'center',
    marginVertical: 7,
    width: '80%',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  cardTitle: {
    fontSize: 17,
    paddingVertical: 20,
  },
});

/********
 *
 *
 import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import theme from 'theme/theme';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { selectedTimeOption } from './constants';
import {
  DeliveryTimeOptionsSelector,
  DateSelector,
  modalSelector,
} from './selectors';
import {
  setTimeDeliveryOption,
  requestTimeDeliveryOptionAction,
  getDateAction,
  getModalShowAction,
} from './actions';
import DatePicker from 'react-native-date-picker';

const key = 'DeliveryTimeContainer';
interface Props {
  selectedDeliveryTime : {}
  selectedDate : any
  modalVisible : boolean

}
const stateSelector = createStructuredSelector({
  selectedDeliveryTime: DeliveryTimeOptionsSelector(),
  selectedDate: DateSelector(),
  modalVisible: modalSelector(),
});

const DeliveryTimeContainer = (props: Props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { selectedDeliveryTime, selectedDate, modalVisible } = useSelector(
    stateSelector,
  );
  const [date, setDate] = useState(new Date());

  useEffect(() => console.log(selectedDate), [selectedDate]);

  useEffect(() => {
    dispatch(requestTimeDeliveryOptionAction());
  }, []);

  useEffect(() => {
    console.log('selectedTime : ', selectedDeliveryTime);
    if (
      selectedDeliveryTime[1]?.name === 'Planifier' &&
      selectedDeliveryTime[1]?.isSelect
    ) {
      dispatch(getModalShowAction(true));
    }
  }, [selectedDeliveryTime]);
  const handleSelectedTime = (obj: any) => {
    let fulList;
    fulList = selectedDeliveryTime.map((b: any) => {
      if (b.name === obj.name) {
        return {
          name: obj.name,
          isSelect: !obj.isSelect,
        };
      } else {
        return {
          name: b.name,
          isSelect: !b.isSelect,
        };
      }
    });
    if (obj.name == 'Planifier' && date) {
      dispatch(getModalShowAction(false));
    } else {
      dispatch(setTimeDeliveryOption(selectedTimeOption));
      dispatch(getDateAction(''));
    }
    dispatch(setTimeDeliveryOption(fulList));
  };

  useEffect(() => {
    if (!modalVisible && !selectedDate) {
      dispatch(setTimeDeliveryOption(selectedTimeOption));
    }
  }, [modalVisible]);

  return (
    <>
      <Text style={styles.DeliveryTimeOptionTitleStyle}>
        Heure de livraison
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
        }}>
        {selectedDeliveryTime.length > 0 && (
          <>
            <TouchableOpacity
              style={{
                width: 174,

                height: 34,
                backgroundColor: selectedDeliveryTime[0].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.light,
                borderWidth: 1,
                borderRadius: 18,
                justifyContent: 'center',
              }}
              onPress={() => handleSelectedTime(selectedDeliveryTime[0])}>
              <Text
                style={{
                  textAlign: 'center',
                  color: selectedDeliveryTime[0].isSelect
                    ? theme.palette.default.light
                    : theme.palette.default.main,
                  fontSize: theme.fontSizing.default[3],
                }}>
                Maintenant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 174,
                height: 34,
                borderWidth: 1,
                backgroundColor: selectedDeliveryTime[1].isSelect
                  ? theme.palette.default.main
                  : theme.palette.default.light,
                borderRadius: 18,
                justifyContent: 'center',
              }}
              onPress={() => {
                handleSelectedTime(selectedDeliveryTime[1]);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: selectedDeliveryTime[1].isSelect
                    ? theme.palette.default.light
                    : theme.palette.default.main,
                  fontSize: theme.fontSizing.default[3],
                }}>
                {selectedDate && !selectedDeliveryTime[0].isSelect
                  ? selectedDate?.toDateString()
                  : 'Planifier'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(getModalShowAction(false));
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
          onPressOut={() => {
            dispatch(getModalShowAction(false));
          }}>
          <View style={styles.panel}>
            <DatePicker
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                //  backgroundColor: 'red',
                width: theme.dimensions.width,
              }}
              date={date}
              fadeToColor="none"
              minimumDate={new Date()}
              locale="fr-FR"
              onDateChange={setDate}
              maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            />

            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => {
                dispatch(getDateAction(date));
                dispatch(getModalShowAction(false));
              }}>
              <Text style={styles.panelButtonTitle}>Valider</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DeliveryTimeContainer;

const styles = StyleSheet.create({
  DeliveryTimeOptionTitleStyle: {
    fontSize: 23,
    paddingBottom: 10,
  },
  panel: {
    //padding: 20,
    //backgroundColor: '#FFFFFF',
    // paddingTop: 20,
    backgroundColor: theme.palette.default.light,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    borderWidth: 1,
    width: '100%',
    height: 250,
    elevation: 5,
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panelHeader: {
    alignItems: 'center',
  },

  panelTitle: {
    fontSize: 22,
    height: 35,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.palette.default.main,
    alignItems: 'center',
    marginVertical: 7,
    width: '80%',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

/********
 *
 *
      <Modal
        style={{ justifyContent: 'flex-end', alignItems: 'center', margin: 0 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
            width: theme.dimensions.width,
            marginHorizontal: theme.spacing.default[5],
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View style={{ width: '100%' }}>
            <RenderInner />
          </View>
        </TouchableOpacity>
      </Modal>
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
