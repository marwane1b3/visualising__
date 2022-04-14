import React, { ReactNode, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native';
import theme from 'theme/theme';

interface Props {
	title: string,
	actionTitle: string
  showModal: any;
  setShowModal: any;
  mainAction: any;
  children?: ReactNode;
}

const CustomModal = (props: Props) => {
  const { showModal, setShowModal, mainAction, children, title, actionTitle } =
    props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <TouchableWithoutFeedback
        style={{ backgroundColor: 'yellow' }}
        onPress={() => setShowModal(false)}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View
              style={{
                borderBottomColor: '#aaaaaa80',
                borderBottomWidth: 1,
                padding: theme.spacing.default[3],
              }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {title}
                {/* Choisissez une adresse de livraison */}
              </Text>
            </View>
            {children && (
              <View style={styles.childrenContainer}>{children}</View>
            )}
            <View style={styles.actionButtonContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  padding: 20,
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={mainAction}
                    style={{
                      alignItems: 'center',
                      padding: 10,
                      backgroundColor: '#28B873',
                      borderRadius: 50,
                    }}>
                    <Text style={{ color: 'white' }}>{actionTitle}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.default.light,
    // backgroundColor: 'red',
    borderRadius: 5,
    width: theme.dimensions.width - 80,
    // padding: theme.spacing.default[4],
  },
  mainContainer: {
    backgroundColor: '#00000080',
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonContainer: {
    borderTopColor: '#aaaaaa80',
    borderTopWidth: 1,
  },
  childrenContainer:{
		padding: theme.spacing.default[2]
	}
});
export default CustomModal;

/** */
