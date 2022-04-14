/**
 *
 * AdBannierContainer
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import reducer from './reducer';
import saga from './saga';
import { Text, View, Linking } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import theme from 'theme/theme';
import { pubBannier } from './constants';
import { getPubGroupsAction } from './actions';
import makeSelectAdBannierContainer, {
  makeSelectErrorPubMessage,
  makeSelectpublicityGroupBannerState,
} from './selectors';
import { MICROSERVICE_BASE_URL } from 'utils';
import { getId } from 'screens/ItemsListScreen/actions';

import { SCREENS } from 'navigators/constants';
import { useNavigation } from '@react-navigation/native';
const stateSelector = createStructuredSelector({
  adBannierContainer: makeSelectAdBannierContainer(),
  pubBanner: makeSelectpublicityGroupBannerState(),
  errorMsg: makeSelectErrorPubMessage(),
});

const key = 'adBannierContainer';
export interface IProps {
  serviceId?: any;
}
const AdBannierContainer = (props: IProps) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [externalLinks, setExternalLinks] = useState(['']);
  const [localLink, setLocalLink] = useState([]);
  const [cleanUp, setCleanUp] = React.useState(false);

  const { adBannierContainer, pubBanner, errorMsg } =
    useSelector(stateSelector);

  useEffect(() => {
    dispatch(
      getPubGroupsAction(props?.serviceId?.length > 0 ? props?.serviceId : ''),
    );
    return () => {
      setLocalLink([]);

      setExternalLinks(['']);

      setImages([]);
    };
  }, []);
  useEffect(() => {
    if (pubBanner && Object.keys(pubBanner).length > 0) {
      pickImages(pubBanner);
    }
    return () => {
      setLocalLink([]);

      setExternalLinks(['']);

      setImages([]);
    };
  }, [pubBanner]);

  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const pickImages = (pubParam: any) => {
    const subGroups = pubParam?.publicitySubGroups;
    // console.log('publicitySubGroups', subGroups);
    // console.log('i entererd');

    const pubs = subGroups.map((pub: any) => {
      return pub.pubs;
    });

    const cleanImages = pubs[0].map(
      (image: { imageUrl: string; externalLink: string }) => image.imageUrl,
    );
    const externalLinks = pubs[0].map(
      (image: { externalLink: string }) => image.externalLink,
    );

    const LcLink = pubs[0].map((item: { storeId: string }) => item);
    //  console.log('localLinks :', LcLink);
    setLocalLink(LcLink);
    //console.log('externalLinks', externalLinks);
    setExternalLinks(externalLinks);
    //  console.log('cleanImages', cleanImages);
    setImages(cleanImages);
  };
  const checkExternal = (index: number, extLinks: string[], localLink: any) => {
    try {
      extLinks.forEach(async (extLink: string, extIndex: number) => {
        if (extIndex === index && extLink.length > 0) {
          await Linking.openURL(extLink).catch((err) =>
            console.error('oops : ', err),
          );
        } else {
          if (extIndex === index && extLink.length === 0) {
            fetch(
              `${MICROSERVICE_BASE_URL.CONTENT}/store/${localLink[extIndex].storeId}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
              .then((response) => response.json())
              .then((body: any) => {
                navigation.navigate(SCREENS.ITEMS_LIST, {
                  storeDetails: body,
                });
              })
              .catch((err) => console.log('error ', err));
          }
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <>
      {errorMsg.length === 0 && images.length > 0 && (
        <View style={{ height: 200, marginHorizontal: 15 }}>
          <ImageSlider
            images={images}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 15,
              //boderWidth: 1,
              overflow: 'hidden',
              // marginLeft: 15,
            }}
            onPress={(item: { index: number }) =>
              checkExternal(item.index, externalLinks, localLink)
            }
            autoPlayWithInterval={5000}
          />
        </View>
      )}
    </>
  );
};

export default memo(AdBannierContainer);
/**
 *
 * const pickImages = () => {
    let publicitySubGroups = pubBannier.publicitySubGroups;

    let pubs = publicitySubGroups.map((pub: any) => {
      return pub.Pubs;
    });

    const cleanImages = pubs[0].map(
      (image: { imageUrl: string; externalLink: string }) => image.imageUrl,
    );
    const externalLinks = pubs[0].map(
      (image: { externalLink: string }) => image.externalLink,
    );

    //console.log('externalLinks', externalLinks);
    setExternalLinks(externalLinks);
    //  console.log('cleanImages', cleanImages);
    setImages(cleanImages);
  };
 *
 *
 *
 *
 */
