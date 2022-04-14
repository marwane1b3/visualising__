/**
 *
 * OrdersScreen
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectOrdersScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'components/FormattedMessage';
import messages from './messages';
import { WebView } from 'react-native-webview';

const stateSelector = createStructuredSelector({
  ordersScreen: makeSelectOrdersScreen(),
});

const key = 'ordersScreen';

export const OrdersScreen: React.FC<IOrdersScreenProps> = ({ }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* eslint-disable no-unused-vars */
  const { ordersScreen } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  return (
    <WebView
      source={{
        uri:
          'https://pa2.naps.ma:8441/GW_PAIEMENT/faces/vues/paiement/gatewaynaps.xhtml?data1=Wgg2y8%2BTiaGursvmGWWisNor4SDbrIi%2BsXmtX4Qj8bdLstN4OidbjY2pdwi6KJC7d%2BSoBjOfgJMeKxdQzqDvbTXY8DzEnzZMh93z0L1EDjIzPRxTTp3L2Xbp%2F2IOnf42Ewd02s9PotroJPXiEcubSeE5KZpqxZLL76O9uTYSD1Wl4gFEc8v2GKrwd9lp9XMTSFjSOz5enU8U3t%2FhthjQPaYxuZolEo%2FkGKEg9Cf94PNIlo06TRZFs9unyIWBjo1W00cSNhHB9bSqS%2BSmmXkwaYCZRQznMKX6BdWCnxev8h6DcxRWSAyHVMdIQHUCndsJWxhihhN2EKpRge1PouOKGQ%3D%3D&data2=XZPemshUmEEe6NzEiiI5RZTMd8obKYJyMo4Du1DbOogXeQlUmisxB%2BddkZCBtBxiUf7rNqpmIoXkJ%2FnQjPWWQjNesDb3HvNEhz5RvQil%2BpjrPJV16qFvQWFMZSQ%2BbLB1lhUpisI2vOEdlwIerP33XD0fLkW9S346NChxj2ffYlzC9NQNmwulVeDe1aCmoUSmuOvijHT%2BGYhnWsGgJlvR6Dv8ER1VDwzjhrL3IrrZb5ONhUeRsFdhL6LOwaWujulrLvAoeEmSmFL7wABuedIyJR1qdIlzH2oziYWBgdFJM9f6bLYRcwjXAyXE5cNanmMTZphF1zoRUqmC44yq4IvMAg%3D%3D&data3=ICAZACS%2Bu7cL2Gzd8RSqUr3JkDZTWmaXjLWbxUqOg9mYwYJURt7y1inaQqYY8XRds8EW2NOOB4sjT149U7W4SIMhrYS2S7b97Ip%2Ftx51DPMutkigHgRij2k0hwi96mkOMqUlptHO13QJjc3ZQcI%2Baq0Kf9%2FPmuldpQWu%2B28zhtBaBZg6yK9LtboCztmT1va6wfaf2Wg4Sm4pXnR3Ppy%2BZfeAJAwtFwqCNYZM5Uf1Chwm%2Blzsr1yUzfaitiWaeUqSGDSxvx%2FqoTJuMxeZRY4ItAjdU8RWn4I5bL1qQR35jpSP%2BZliCC4sRsiF%2FGJB0owDtg%2FdCjYZgr%2B9PtY7%2BRVdhw%3D%3D&data4=gDgR37KzrPe5vkyXpeQ6wXsySyYvM90lMSK0CdwG%2Fv7vg733d1v0MCkWuK983kqoK3T56ggbElIJZ5c1hp1gHaOdY7u9nx1XFs2xU37qpfg7BfTfHEG0jrXRgREYd1RRJXG%2Bea7is2k6WiiZWqaYecx6puJ0uuirJvWBmUzPFqUn%2F2HSTm54%2F7PWeQrePugNM%2BxU6gOYxcybHcw4qCj4zBgn21clgoJ6%2BPDNADkKHmsLE14Fpz0ZuSHdsQqP3ne9IBvo2vmjpHLSldIoi5FV6%2BpeB5KEY1j74i%2Fe3Zjke7OKCzg4W0i32dd8%2FzQ6wl0NuZbN9js7qFFIxwmAuaLE%2Bg%3D%3D&cmr=1702021&gal=0091',
      }}
      style={{ marginTop: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});


export interface IOrdersScreenProps {}



export default OrdersScreen;
