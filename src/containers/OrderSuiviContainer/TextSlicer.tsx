import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  mappingHistoryStatus,
  mappingEncourStatus,
} from 'containers/OrderHistoryListContainer/constants';
interface Props {}

const TextSlicer = (props: Props) => {
  return <></>;
};

export const sliceText = (str: any) => {
  switch (str) {
    case mappingEncourStatus['WAITING_FOR_ACCEPT']:
      return (
        <>
          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['WAITING_FOR_ACCEPT'].slice(0, 10)}
          </Text>

          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['WAITING_FOR_ACCEPT'].slice(
              10,
              mappingEncourStatus['WAITING_FOR_ACCEPT'].length,
            )}
          </Text>
        </>
      );

    case mappingEncourStatus['ACCEPTED']:
      return (
        <>
          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['ACCEPTED'].slice(0, 8)}
          </Text>

          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['ACCEPTED'].slice(
              8,
              mappingEncourStatus['ACCEPTED'].length,
            )}
          </Text>
        </>
      );

    case mappingEncourStatus['START_PREPARATION']:
      return (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['START_PREPARATION'].slice(0, 2)}
          </Text>

          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['START_PREPARATION'].slice(
              2,
              mappingEncourStatus['START_PREPARATION'].length,
            )}
          </Text>
        </View>
      );

    case mappingEncourStatus['STARTED_DELIVERY']:
      return (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['STARTED_DELIVERY'].slice(0, 8)}
          </Text>

          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['STARTED_DELIVERY'].slice(
              8,
              mappingEncourStatus['STARTED_DELIVERY'].length,
            )}
          </Text>
        </View>
      );

    case mappingEncourStatus['ARRIVED_TO_DESTINATION']:
      return (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 5,
          }}>
          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['ARRIVED_TO_DESTINATION'].slice(0, 10)}
          </Text>

          <Text style={{ fontSize: 12 }}>
            {mappingEncourStatus['ARRIVED_TO_DESTINATION'].slice(
              10,
              mappingEncourStatus['ARRIVED_TO_DESTINATION'].length,
            )}
          </Text>
        </View>
      );
  }
};
export default TextSlicer;

const styles = StyleSheet.create({});
