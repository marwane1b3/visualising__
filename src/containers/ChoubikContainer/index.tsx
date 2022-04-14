import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import theme from 'theme/theme';
import CameraIcon from 'react-native-vector-icons/Entypo';
import Microphone from 'react-native-vector-icons/MaterialCommunityIcons';
import Play from 'react-native-vector-icons/Ionicons';
import Controller from 'react-native-vector-icons/Entypo';
import Trash from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  PlayBackType,
} from 'react-native-audio-recorder-player';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { audioSelector, imageSelector, mapShowSelector } from './selectors';
import { setAudioAction, setPhotoAction } from './actions';
import CheckPermission from 'hooks/usePermissionsLogic';
import ImageHandler, { ImageListHandler } from './imageHandler';
import MapHandler, { MinimapView } from './mapHandler';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
const key = 'ChoubikContainer';
interface Props {
  height: number;
  audioPath: string;
  setAudioAction: Function;
  images: [];
  setPhotoAction: Function;
  term: any;
  seTextAction: Function;
  displayMap: boolean;

  isPickup?: boolean;
  index?: number;
  currentPositionSec?: number;
  currentDurationSec?: number;
  setCurrentPositionSec?: Function;
  setCurrentDurationSec?: Function;
}

const stateSelector = createStructuredSelector({
  audioPath: audioSelector(),
  imagePath: imageSelector(),
  showHideMap: mapShowSelector(),
});
// const requestMicPermission = async () => {
//   try {
//     const grants = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     ]);

//     if (
//       grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       grants['android.permission.RECORD_AUDIO'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       return Promise.resolve(true);
//     } else {
//       console.log('All required permissions not granted');
//       return Promise.reject(false);
//     }
//   } catch (err) {
//     console.warn(err);
//     return;
//   }
// };

const audioRecorderPlayer = new AudioRecorderPlayer();

const ChoubikContainer = (props: Props) => {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  const dirs = RNFetchBlob.fs.dirs;
  const dispatch = useDispatch();
  // parent state
  //const { imagePath } = useSelector(stateSelector);
  // console.log(props.isPickup);
  // local state
  const [showMap, setShowMap] = useState(false);
  const [term, setTerm] = useState('');
  const [recordsecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [audioStateShow, setAudioStateShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const handleMapShow = () => setShowMap((prevState) => !prevState);
  const handleImageShow = () => setImageShow(true);
  // useEffect(() => console.log('chbikAudio', audioPath), [audioPath]);
  // useEffect(() => console.log('chbikImag', imagePath), [imagePath]);
  // useEffect(() => {
  //   CheckPermission();
  // }, []);

  // audio functions : start stop play stopPlay
  const onStartRecording = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        setAudioStateShow(false);
        console.log('permission checking done :: true');

        const random = 'id' + Math.random().toString(16).slice(2);
        const path = Platform.select({
          ios: 'sound.m4a',
          android: `${dirs.CacheDir}/${random}.mp3`,
        });
        const audioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        const meteringEnabled = false;
        const result = await audioRecorderPlayer
          .startRecorder(path, audioSet, meteringEnabled)
          .catch((err) => console.log('from startRecorder' + err));

        audioRecorderPlayer.addRecordBackListener((e: any) => {
          setRecordSecs(e.currentPosition);
          setRecordTime(
            audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          );
          setPlayTime(
            audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          );

          return;
        });
        if (result) {
          if (props.isPickup) {
            dispatch(props.setAudioAction(result, props.isPickup, props.index));
          } else if (props.isPickup === false) {
            dispatch(props.setAudioAction(result, props.isPickup, props.index));
          } else {
            dispatch(props.setAudioAction(result));
          }
        }
      } else {
        console.log('All required permissions not granted');
      }
    } catch (error) {
      console.log('From recoding error : ', error);
    }
  };
  const onStopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    // console.log(result);
    setPlayAudio(false);
    setAudioStateShow(true);
  };
  const onStopPlay = async () => {
    try {
      //console.log('onStopPlay');
      await audioRecorderPlayer.stopPlayer();
      await audioRecorderPlayer.removePlayBackListener();
    } catch (error) {
      console.log(error);
    }
  };

  const onStartPlay = async (
    audioPath: any,
    index?: number,
    isPickup?: boolean,
  ) => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(audioPath);
      console.log(audioPath);

      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          //console.log('finished');

          onStopPlay();
        }

        setCurrentPositionSec(e.currentPosition);
        setCurrentDurationSec(e.duration);

        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        setPlayAudio(true);
        return;
      });
    } catch (error) {
      console.log(error);
    }
  };
  // audio functions end
  return (
    <View style={styles.ChoubikStylesContainer}>
      <View
        style={[
          styles.ChoubikItemsStylesContainer,
          {
            minHeight: props.height,
          },
        ]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Ajouter votre commentaire"
          placeholderTextColor={'#999999'}
          value={props.term}
          onChangeText={(e: any) => {
            if (props.isPickup) {
              dispatch(props.seTextAction(e, props.isPickup, props.index));
            } else if (props.isPickup === false) {
              dispatch(props.seTextAction(e, props.isPickup, props.index));
            } else {
              dispatch(props.seTextAction(e));
            }
          }}
          style={styles.TextInput}
          multiline
          onSubmitEditing={() => {
            if (props.isPickup) {
              dispatch(
                props.seTextAction(
                  term ? term : '',
                  props.isPickup,
                  props.index,
                ),
              );
            } else if (props.isPickup === false) {
              dispatch(
                props.seTextAction(
                  term ? term : '',
                  props.isPickup,
                  props.index,
                ),
              );
            } else {
              dispatch(props.seTextAction(term ? term : ''));
            }
          }}
        />
        <View>
          {showMap && <MinimapView />}
          {props.images.length > 0 && imageShow && (
            <ImageListHandler
              imageArray={props.images}
              setPhotoAction={props.setPhotoAction}
              isPickup={props.isPickup}
              index={props.index}
            />
          )}
          {props.audioPath?.length > 0 && audioStateShow && (
            <View
              style={{
                // borderWidth: 1,
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                // width: '50%',
                height: 25,
                marginLeft: 15,

                //padding: 20,
                // backgroundColor: 'yellow',
              }}>
              <Play
                name="play"
                size={18}
                onPress={() => onStartPlay(props.audioPath, props.index)}
              />
              <Progress.Bar
                progress={
                  playAudio ? currentPositionSec / currentDurationSec : 0
                }
                unfilledColor="#fff"
                width={150}
              />

              <Text>
                {duration.substr(0, 5)} / {playTime.substr(0, 5)}
              </Text>

              <Trash
                name="trash"
                size={18}
                onPress={() => {
                  // dispatch(setAudioAction(''));
                  if (props.isPickup) {
                    dispatch(
                      props.setAudioAction('', props.isPickup, props.index),
                    );
                  } else if (props.isPickup === false) {
                    console.log('from recorder ', props.index);

                    dispatch(
                      props.setAudioAction('', props.isPickup, props.index),
                    );
                  } else {
                    dispatch(props.setAudioAction(''));
                  }

                  setAudioStateShow(false);
                }}
              />
            </View>
          )}
        </View>
        <View style={{ flex: 1 }} />
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#CDD4D9', '#CDD4D9']}
          style={{
            //  position: 'absolute',
            height: 35,
            borderRadius: 6,

            width: '100%',
            //   bottom: 0,
            // alignSelf: 'flex-end',
          }}>
          {recordsecs !== 0 && (
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                bottom: 5,
                left: 5,
                width: 100,
                //  borderWidth: 1,
                justifyContent: 'space-around',
              }}>
              <Controller name="controller-record" size={21} color="red" />
              <Text>{recordTime.substring(0, 5)}</Text>
            </View>
          )}

          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              right: 15,
              bottom: 5,
              //margin: 5,
              width: props.displayMap ? 100 : 50,
              // borderWidth: 1,
              justifyContent: 'space-around',
              alignItems: 'stretch',
            }}>
            {recordsecs !== 0 ? (
              <>
                <TouchableOpacity onPress={onStopRecording}>
                  <Microphone name="microphone" size={23} color="red" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={onStartRecording}>
                <Microphone name="microphone" size={21} />
              </TouchableOpacity>
            )}
            <ImageHandler
              handleImageShow={handleImageShow}
              imageShow={imageShow}
              imageArray={props.images}
              setPhotoAction={props.setPhotoAction}
              isPickup={props.isPickup}
              index={props.index}
            />
            {props.displayMap && (
              <MapHandler handleMap={handleMapShow} showMap={showMap} />
            )}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ChoubikContainer;

const styles = StyleSheet.create({
  ChoubikStylesContainer: {
    // flex: 1,
    backgroundColor: theme.palette.default.light,
    //borderWidth: 1,
  },
  ChoubikItemsStylesContainer: {
    // flex: 1,
    flexDirection: 'column',
    //paddingHorizontal: 15,
    alignItems: 'flex-start',
    // marginTop: 15,
    margin: 16,
    //  width: '100%',
    //   backgroundColor: theme.palette.default.main,

    justifyContent: 'flex-start',

    //backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CDD4D9',
    // paddingBottom: 100,
    //  backgroundColor: 'pink',
  },
  TextInput: {
    width: '100%',
    //paddingVertical: 20,
    paddingVertical: 7,
    fontSize: 15,
    color: 'black',
    paddingLeft: 15,
    minHeight: 80,
    // borderWidth: 1,
    //  textAlign: 'center',
  },

  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 25,
    alignSelf: 'stretch',
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 25,
    width: 0,
  },
});

/**
 *
 *  const onStartRecording = async () => {
    try {
      if (
        !PermissionsAndroid.PERMISSIONS.RECORD_AUDIO ||
        !PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE ||
        !PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ) {
        requestCameraPermission();
      }

      setAudioStateShow(false);

      const random = 'id' + Math.random().toString(16).slice(2);
      const path = Platform.select({
        ios: 'sound.m4a',
        android: `sdcard/${random}.mp3`,
      });
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      const meteringEnabled = false;
      const result = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled,
      );

      audioRecorderPlayer.addRecordBackListener((e: any) => {
        setRecordSecs(e.currentPosition);
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        );
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

        return;
      });
      if (result) {
        if (props.isPickup) {
          dispatch(props.setAudioAction(result, props.isPickup, props.index));
        } else if (props.isPickup === false) {
          dispatch(props.setAudioAction(result, props.isPickup, props.index));
        } else {
          dispatch(props.setAudioAction(result));
        }
      }
    } catch (error) {
      console.log('From recoding error : ', error);
    }
  };
 *
 *
 *
 *
 *
 *
 *
 *
 */
