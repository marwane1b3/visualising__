import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import CameraIcon from 'react-native-vector-icons/Entypo';
import theme from 'theme/theme';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoAction } from './actions';
import { createStructuredSelector } from 'reselect';
import { imageSelector } from './selectors';
interface Props {
  handleImageShow: Function;
  imageShow: boolean;
  imageArray: any;
  setPhotoAction: Function;
  isPickup?: boolean;
  index?: number;
}
const stateSelector = createStructuredSelector({
  imageArray: imageSelector(),
});

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'camera access',
        message:
          'kaalix App needs access to your camera ' +
          'so we can send your request.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use camera ');
      return Promise.resolve(true);
    } else {
      console.log('camera permission denied');
      return Promise.reject(false);
    }
  } catch (err) {
    console.log(err);
  }
};
const ImageHandler = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  //  const { imageArray } = useSelector(stateSelector);
  // for modal actions
  useEffect(() => {
    if (!PermissionsAndroid.PERMISSIONS.CAMERA) requestCameraPermission();
  }, [PermissionsAndroid]);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 150,
      compressImageMaxHeight: 150,

      multiple: true,
      maxFiles: 3,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        console.log(image);
        let maxNumImages = image;

        if (props.imageArray?.length > 2) {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                props.imageArray,
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            // console.log('from recorder ', props.index);

            dispatch(
              props.setPhotoAction(
                props.imageArray,
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(dispatch(props.setPhotoAction(props.imageArray)));
          }

          // dispatch(setPhotoAction(props.imageArray));
          //        dispatch(setPhotoAction([maxNumImages]));
        } else if (props.imageArray?.length == 2) {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(props.setPhotoAction([...props.imageArray, maxNumImages]));
          }

          // dispatch(
          //   props.setPhotoAction([...props.imageArray, maxNumImages[0]]),
          // );
        } else {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(props.setPhotoAction([...props.imageArray, maxNumImages]));
          }

          // dispatch(
          //   props.setPhotoAction([...props.imageArray, ...maxNumImages]),
          // );
        }
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      compressImageQuality: 0.7,
      multiple: true,
      maxFiles: 3,
    })
      .then((image) => {
        let maxNumImages = image;
        if (image.length > 2) {
          maxNumImages = image.slice(0, 2);

          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(maxNumImages, props.isPickup, props.index),
            );
          } else if (!props.isPickup) {
            dispatch(
              props.setPhotoAction(maxNumImages, props.isPickup, props.index),
            );
          } else {
            dispatch(dispatch(props.setPhotoAction(maxNumImages)));
          }

          //  dispatch(props.setPhotoAction(maxNumImages));
          return;
        }

        if (props.imageArray?.length > 2) {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                props.imageArray,
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            // console.log('from recorder ', props.index);

            dispatch(
              props.setPhotoAction(
                props.imageArray,
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(dispatch(props.setPhotoAction(props.imageArray)));
          }

          // dispatch(setPhotoAction(props.imageArray));
          //        dispatch(setPhotoAction([maxNumImages]));
        } else if (props.imageArray?.length == 2 && maxNumImages.length > 1) {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages[0]],
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, maxNumImages[0]],
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(
              dispatch(
                props.setPhotoAction([...props.imageArray, maxNumImages[0]]),
              ),
            );
          }

          // dispatch(
          //   props.setPhotoAction([...props.imageArray, maxNumImages[0]]),
          // );
        } else {
          if (props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, ...maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else if (!props.isPickup) {
            dispatch(
              props.setPhotoAction(
                [...props.imageArray, ...maxNumImages],
                props.isPickup,
                props.index,
              ),
            );
          } else {
            dispatch(
              dispatch(
                props.setPhotoAction([...props.imageArray, maxNumImages[0]]),
              ),
            );
          }

          // dispatch(
          //   props.setPhotoAction([...props.imageArray, ...maxNumImages]),
          // );
        }
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  // for modal
  const RenderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload screenshot</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromGallery}>
        <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          props.handleImageShow();
        }}>
        <CameraIcon
          name="camera"
          size={21}
          color={modalVisible ? 'red' : 'black'}
        />
      </TouchableOpacity>
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
    </>
  );
};
interface ImageListHandlerProps {
  imageArray: any;
  setPhotoAction: Function;
  isPickup?: boolean;
  index?: number;
}
export const ImageListHandler = (props: ImageListHandlerProps) => {
  const dispatch = useDispatch();
  // const { imageArray } = useSelector(stateSelector);

  const handleDeleteImage = (obj: any) => {
    let newImageArray = props.imageArray.filter(
      (a: any) => a.path !== obj.path,
    );

    if (props.isPickup) {
      dispatch(
        props.setPhotoAction(newImageArray, props.isPickup, props.index),
      );
    } else if (props.isPickup === false) {
      dispatch(
        props.setPhotoAction(newImageArray, props.isPickup, props.index),
      );
    } else {
      dispatch(props.setPhotoAction(newImageArray));
    }

    // dispatch(props.setPhotoAction(newImageArray));
  };

  return (
    <View style={{ width: '100%', height: 120 }}>
      <FlatList
        data={props.imageArray}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(items: any) => (
          <ImageBackground
            source={{ uri: items.item.path }}
            style={{
              height: 98,
              width: 93,
              borderWidth: 1,
              marginLeft: 25,
              marginBottom: 23,

              borderRadius: 5,
            }}
            imageStyle={{
              resizeMode: 'contain',
            }}>
            <TouchableOpacity onPress={() => handleDeleteImage(items.item)}>
              <Text>X</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export default ImageHandler;

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    //  borderWidth: 1,
    width: '80%',
    height: 300,
    elevation: 5,
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
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
