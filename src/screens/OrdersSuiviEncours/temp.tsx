// import React from 'react';
// import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
// import theme from 'theme/theme';
// import {
//   mappingHistoryStatus,
//   mappingEncourStatus,
// } from 'containers/OrderHistoryListContainer/constants';
// import WaitingSvg from '../../../assets/icons/Acceptation.svg';
// import Acceptee from '../../../assets/icons/Acceptee.svg';
// import Destination from '../../../assets/icons/Destination.svg';
// import Preparation from '../../../assets/icons/Preparation.svg';
// import Phone from '../../../assets/icons/Phone.svg';
// import EnRoute from '../../../assets/icons/EnRoute.svg';

// interface Props {
//   route: any;
// }

// const OrdersSuiviEncours = (props: Props) => {
//   const { orderDetails } = props.route.params;
//   console.log(
//     'orderDetailsorderDetailsorderDetails:',
//     JSON.stringify(orderDetails.payment.cartDetails),
//   );

//   const handleOrderDetails = () => {
//     return (
//       <View
//         style={{
//           marginTop: 30,
//           flexDirection: 'column',
//         }}>
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginLeft: 16,
//             marginBottom: 7,
//           }}>
//           Détail de Commande
//         </Text>

//         {orderDetails.payment.cartDetails.map((a: any, index1: number) => (
//           <View key={index1}>
//             {a.items.map((b, index: number) => (
//               <View key={index}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginHorizontal: 15,
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                     }}>
//                     {b.quantity} X {b.name} :
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                     }}>
//                     {b.itemPrice} DH
//                   </Text>
//                 </View>
//                 {b.specifications?.length > 0 &&
//                   b.specifications.map(
//                     (specification: any, indexSpecification: number) => (
//                       <View
//                         key={indexSpecification}
//                         style={{
//                           flexDirection: 'column',

//                           marginLeft: 35,
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 13,
//                             fontWeight: 'bold',
//                             marginVertical: 5,
//                           }}>
//                           {specification.name}
//                         </Text>
//                         {/* <View
//                           style={{ flexDirection: 'column', marginLeft: 20 }}>
//                           <Text>blalba</Text>
//                           <Text>blalba</Text>
//                           <Text>blalba</Text>
//                         </View> */}

//                         {specification?.list?.length > 0 &&
//                           specification?.list?.map(
//                             (
//                               specificationListItem: any,
//                               specificationListItemIndex: number,
//                             ) => (
//                               <View
//                                 key={specificationListItemIndex}
//                                 style={{
//                                   flexDirection: 'column',
//                                   marginLeft: 10,
//                                   marginBottom: 5,
//                                 }}>
//                                 <View
//                                   style={{
//                                     flexDirection: 'row',
//                                     alignItems: 'center',
//                                   }}>
//                                   <View
//                                     style={{
//                                       backgroundColor:
//                                         theme.palette.default.dark,
//                                       width: 10,
//                                       height: 10,
//                                       borderRadius: 5,
//                                       marginRight: 5,
//                                     }}
//                                   />
//                                   <Text>{specificationListItem.name}</Text>
//                                 </View>
//                               </View>
//                             ),
//                           )}
//                       </View>
//                     ),
//                   )}
//               </View>
//             ))}
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const paymentDetails = () => {
//     return (
//       <View
//         style={{
//           marginTop: 50,
//         }}>
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginLeft: 16,
//           }}>
//           Détail du Paiement
//         </Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginHorizontal: 15,
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 15,
//             }}>
//             {orderDetails.store.name} :
//           </Text>
//           <Text
//             style={{
//               fontSize: 15,
//             }}>
//             {orderDetails.payment.orderPrice} DH
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginHorizontal: 16,
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 15,
//             }}>
//             Frais de livraison :
//           </Text>
//           <Text
//             style={{
//               fontSize: 15,
//             }}>
//             {orderDetails.payment.deliveryPrice} DH
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginHorizontal: 16,
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: 'bold',
//             }}>
//             total :
//           </Text>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: 'bold',
//             }}>
//             {orderDetails.payment.total} DH
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView scrollEnabled contentContainerStyle={styles.SuiviScreenStyle}>
//       <Image
//         source={require('assets/images/Shef.png')}
//         style={{
//           // resizeMode: 'contain',
//           width: theme.dimensions.width,
//           //  backgroundColor: 'red',
//         }}
//       />
//       <View
//         style={{
//           //   backgroundColor: theme.palette.default.red,
//           height: 50,
//           marginLeft: 10,
//           marginTop: 35,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <WaitingSvg width={38} height={38} />
//         <Acceptee width={38} height={38} />
//         <Preparation width={38} height={38} />
//         <EnRoute width={38} height={38} />
//         <View style={{ marginRight: 5 }}>
//           <Destination width={38} height={38} />
//         </View>
//       </View>
//       <View
//         style={{
//           backgroundColor: theme.palette.default.main,
//           height: 15,
//           //  marginLeft: 15,

//           flexDirection: 'row',
//           // alignItems: 'center',
//         }}></View>
//       <View
//         style={{
//           //  backgroundColor: theme.palette.default.Encours,
//           height: 50,
//           // marginLeft: 5,

//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['WAITING_FOR_ACCEPT'].slice(0, 10)}
//           </Text>

//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['WAITING_FOR_ACCEPT'].slice(
//               10,
//               mappingEncourStatus['WAITING_FOR_ACCEPT'].length,
//             )}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginLeft: 5,
//           }}>
//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['ACCEPTED'].slice(0, 8)}
//           </Text>

//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['ACCEPTED'].slice(
//               8,
//               mappingEncourStatus['ACCEPTED'].length,
//             )}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginLeft: 18,
//           }}>
//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['START_PREPARATION'].slice(0, 2)}
//           </Text>

//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['START_PREPARATION'].slice(
//               2,
//               mappingEncourStatus['START_PREPARATION'].length,
//             )}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginLeft: 10,
//           }}>
//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['STARTED_DELIVERY'].slice(0, 8)}
//           </Text>

//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['STARTED_DELIVERY'].slice(
//               8,
//               mappingEncourStatus['STARTED_DELIVERY'].length,
//             )}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginRight: 5,
//           }}>
//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['ARRIVED_TO_DESTINATION'].slice(0, 10)}
//           </Text>

//           <Text style={{ fontSize: 12 }}>
//             {mappingEncourStatus['ARRIVED_TO_DESTINATION'].slice(
//               10,
//               mappingEncourStatus['ARRIVED_TO_DESTINATION'].length,
//             )}
//           </Text>
//         </View>
//       </View>

//       <View>
//         <Text
//           style={{
//             fontSize: 27,
//             textAlign: 'center',
//           }}>
//           00:30:00
//         </Text>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           //  paddingHorizontal: 55,
//           //alignItems: 'center',
//           //   backgroundColor: 'red',
//         }}>
//         <View
//           style={{
//             margin: 15,
//             alignItems: 'center',
//           }}>
//           <Phone width={60} height={60} />
//           <Text>Mourad Sabir</Text>
//         </View>
//         <View
//           style={{
//             margin: 15,
//             alignItems: 'center',
//           }}>
//           <Phone width={60} height={60} />
//           <Text>Service client</Text>
//         </View>
//       </View>
//       <View>
//         <Text
//           style={{
//             color: theme.palette.default.main,
//             fontSize: 19,
//             textAlign: 'center',
//           }}>
//           {orderDetails.store.name}
//         </Text>
//         <Text
//           style={{
//             fontSize: 12,
//             textAlign: 'center',
//             marginTop: 4,
//           }}>
//           {orderDetails.payment.pickupAddress.address}
//         </Text>
//       </View>
//       {paymentDetails()}
//       {handleOrderDetails()}
//     </ScrollView>
//   );
// };

// export default OrdersSuiviEncours;

// const styles = StyleSheet.create({
//   SuiviScreenStyle: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.default.light,
//   },
// });

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import theme from 'theme/theme';
import {
  mappingHistoryStatus,
  mappingEncourStatus,
} from 'containers/OrderHistoryListContainer/constants';
import WaitingSvg from '../../../assets/icons/Acceptation.svg';
import Acceptee from '../../../assets/icons/Acceptee.svg';
import Destination from '../../../assets/icons/Destination.svg';
import Preparation from '../../../assets/icons/Preparation.svg';
import Phone from '../../../assets/icons/Phone.svg';
import EnRoute from '../../../assets/icons/EnRoute.svg';
import { customerStatusData } from './constants';
interface Props {
  route: any;
}

const OrdersSuiviEncours = (props: Props) => {
  const { orderDetails } = props.route.params;
  console.log(
    'orderDetailsorderDetailsorderDetails:',
    JSON.stringify(orderDetails.payment.cartDetails),
  );
  const svgData = [
    <WaitingSvg width={38} height={38} />,
    <Acceptee width={38} height={38} />,
    <Preparation
      width={38}
      height={38}
      fill={theme.palette.default.inactive}
    />,
    <EnRoute width={38} height={38} />,

    <Destination width={38} height={38} />,
  ];
  const handleOrderDetails = () => {
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

        {orderDetails.payment.cartDetails.map((a: any, index1: number) => (
          <View key={index1}>
            {a.items.map((b, index: number) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 15,
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
                                  marginBottom: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor:
                                        theme.palette.default.dark,
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

  const paymentDetails = () => {
    return (
      <View
        style={{
          marginTop: 50,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 16,
          }}>
          Détail du Paiement
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
            }}>
            {orderDetails.store.name} :
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>
            {orderDetails.payment.orderPrice} DH
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
            }}>
            Frais de livraison :
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>
            {orderDetails.payment.deliveryPrice} DH
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            total :
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {orderDetails.payment.total} DH
          </Text>
        </View>
      </View>
    );
  };

  const renderCustomerStatus = (items: any) => {
    return (
      <View>
        {Object.keys(items.item.keyValue).map((item: any, index: number) => (
          <View key={index}>{sliceText(mappingEncourStatus[item])}</View>
        ))}
      </View>
    );
  };
  return (
    <ScrollView scrollEnabled contentContainerStyle={styles.SuiviScreenStyle}>
      <Image
        source={require('assets/images/Shef.png')}
        style={{
          // resizeMode: 'contain',
          width: theme.dimensions.width,
          //  backgroundColor: 'red',
        }}
      />

      <View
        style={{
          height: 15,
          flex: 1,
        }}
      />
      <FlatList
        data={svgData}
        renderItem={(items: any) => (
          <View
            style={
              {
                //  backgroundColor: 'yellow',
              }
            }>
            {items.item}
            <View
              style={{
                height: 5,
                flex: 1,
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor:
                    items.index === 0 || items.index === 1
                      ? theme.palette.default.main
                      : theme.palette.default.inactive,
                  height: 15,
                  marginHorizontal: 15,
                  width: 15,
                  borderRadius: 7.5,
                  // flexDirection: 'row',
                  alignItems: 'center',
                }}
              />
              {items.index < 5 && (
                <View
                  style={{
                    height: 5,
                    //  borderWidth: 1,
                    position: 'absolute',
                    right: 8,

                    width: 100,
                    backgroundColor:
                      items.index === 0 || items.index === 1
                        ? theme.palette.default.main
                        : theme.palette.default.inactive,
                  }}
                />
              )}
            </View>
          </View>
        )}
        horizontal
        keyExtractor={(items, index: number) => `__ID_${index.toString()}`}
        contentContainerStyle={{
          justifyContent: 'space-between',
          marginLeft: 10,
          flex: 1,
        }}
      />
      <FlatList
        data={customerStatusData}
        renderItem={renderCustomerStatus}
        horizontal
        contentContainerStyle={{
          justifyContent: 'space-between',
          marginLeft: 10,
          flex: 1,
        }}
      />
      <View
        style={{
          height: 15,
          flex: 1,
        }}
      />

      <View>
        <Text
          style={{
            fontSize: 27,
            textAlign: 'center',
          }}>
          00:30:00
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          //  paddingHorizontal: 55,
          //alignItems: 'center',
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            margin: 15,
            alignItems: 'center',
          }}>
          <Phone width={60} height={60} />
          <Text>Mourad Sabir</Text>
        </View>
        <View
          style={{
            margin: 15,
            alignItems: 'center',
          }}>
          <Phone width={60} height={60} />
          <Text>Service client</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: theme.palette.default.main,
            fontSize: 19,
            textAlign: 'center',
          }}>
          {orderDetails.store.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            marginTop: 4,
          }}>
          {orderDetails.payment.pickupAddress.address}
        </Text>
      </View>
      {paymentDetails()}
      {handleOrderDetails()}
    </ScrollView>
  );
};

export default OrdersSuiviEncours;

const styles = StyleSheet.create({
  SuiviScreenStyle: {
    flexGrow: 1,
    backgroundColor: theme.palette.default.light,
  },
});

const sliceText = (str) => {
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
