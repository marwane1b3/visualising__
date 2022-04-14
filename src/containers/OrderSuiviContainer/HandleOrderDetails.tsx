import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'theme/theme';

interface Props {
  orderDetails;
}

const HandleOrderDetails = (props: Props) => {
  return (
    <View
      style={{
        marginTop: 30,
        flexDirection: 'column',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 16,
          marginBottom: 7,
        }}>
        Détail de Commande
      </Text>

      {props.orderDetails.payment.cartDetails.map((a: any, index1: number) => (
        <View key={index1}>
          {a.items.map((b, index: number) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {b.quantity} X {b.name} :
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {b.itemPrice} DH
                </Text>
              </View>
              {b.specifications?.length > 0 &&
                b.specifications.map(
                  (specification: any, indexSpecification: number) => (
                    <View
                      key={indexSpecification}
                      style={{
                        flexDirection: 'column',

                        marginLeft: 35,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        {specification.name}
                      </Text>

                      {specification?.list?.length > 0 &&
                        specification?.list?.map(
                          (
                            specificationListItem: any,
                            specificationListItemIndex: number,
                          ) => (
                            <View
                              key={specificationListItemIndex}
                              style={{
                                flexDirection: 'column',
                                marginLeft: 10,
                                //marginBottom: 5,
                                marginVertical: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    backgroundColor: theme.palette.default.dark,
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginRight: 5,
                                  }}
                                />
                                <Text>{specificationListItem.name}</Text>
                              </View>
                            </View>
                          ),
                        )}
                    </View>
                  ),
                )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default HandleOrderDetails;

const styles = StyleSheet.create({});
