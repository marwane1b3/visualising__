import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getName } from 'containers/MuliCatgories/selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import theme from 'theme/theme';
interface Props
{
  data: any;
  pressFuncion: any;
}
// const startState = createStructuredSelector({
//   list: getName(),
// });
const MultipleSearchComponent = ( props: Props ) =>
{
  // const [flag, setFlag] = useState(false);
  // const { list } = useSelector(startState);

  // React.useEffect(() => {
  //   if (list?.length === 0) {
  //     setFlag(false);

  //     // console.log('render times');
  //   }
  // }, [list]);
  return (
    <TouchableOpacity
      onPress={ () =>
      {
        //   flag ? setFlag(props.data.isSelect) : setFlag(!props.data.isSelect);
        props.pressFuncion( props.data );
      } }
      style={ {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
      } }>
      <>
        <View
          style={ {
            marginBottom: 20,
            margin: 5,
            height: 60,
            width: 60,
            // alignItems: 'center',
            // justifyContent: 'center',
            borderRadius: 15,
            elevation: 3,
            backgroundColor: props.data.isSelect
              ? theme.palette.default.main
              : '#FFFFFF',
          } }
        />
        <Text
          style={ {
            textAlign: 'center',
            color: props.data.isSelect ? theme.palette.default.main : 'black',
            //margin: 5,
          } }>
          { props.data.name }
        </Text>
      </>
    </TouchableOpacity>
  );
};

export default MultipleSearchComponent;

const styles = StyleSheet.create( {} );
