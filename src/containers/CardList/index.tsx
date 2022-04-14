/**
 *
 * CardList
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useIsFocused } from '@react-navigation/native';
import makeSelectCardList, {
  makeSelectCardListScreen,
  makeSelectPaymentUrl,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectUserDetailsData } from '../UserDetails/selectors';
import { Text, TouchableOpacity, View } from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';
import { getCardsAction, selectedCardAction } from './actions';

const stateSelector = createStructuredSelector({
  data: makeSelectCardList(),
  userDetails: makeSelectUserDetailsData,
  cardList: makeSelectCardListScreen,
});

const key = 'cardList';

function CardList() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { data, userDetails, cardList } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  /* eslint-enable no-unused-vars */
  useEffect(() => {
    console.log(userDetails.entityId);
    // if (!cardList) {
    if (isFocused)
      dispatch(getCardsAction({ customerId: userDetails.entityId }));
    //}
    // setCards(cardList);
  }, [isFocused]);
  const [Cards, setCards] = useState(null);

  const checkedCard = async (selectedIndex: number) => {
    let cards: any = [...cardList];
    cards = await cards.map((item: any, index: number) => {
      item.selected = index == selectedIndex;
      return item;
    });
    dispatch(
      selectedCardAction({ selectedCard: cards[selectedIndex], cards: cards }),
    );
  };
  return (
    <View>
      {cardList &&
        cardList.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              onPress={() => checkedCard(index)}
              key={'crd' + index + item._id }
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: item.selected ? '#28B873' : '#000000',
                  fontSize: 15,
                  textAlign: 'left',
                }}>
                {item.type} {item.numCarte} {item.selected}
              </Text>
              <RoundCheckbox
                size={22}
                checked={item.selected}
                onValueChange={() => {
                  checkedCard(index);
                }}
                icon={'checkmark'}
                backgroundColor={'#28B873'}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

CardList.propTypes = {};

export default CardList;
