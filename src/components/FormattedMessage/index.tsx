import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import * as i18n from 'i18n';
import { createSelector } from 'reselect';
import { makeSelectLocale } from 'providers/LanguageProvider/selectors';
import { useSelector } from 'react-redux';
import useTheme from 'hooks/useTheme';

const stateSelector = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

const FormattedMessage: React.FC<IFormattedMessageProps> = (props) => {
  const { scope, options, args, ...textProps } = props;
  const { color } = useTheme();

  const { locale } = useSelector(stateSelector);

  return (
    <Text
      {...textProps}
      style={[{ color: '#28B873', fontSize: 15, fontWeight: 'bold' }, props.style]}>
      {i18n.t(scope, { locale, ...options, ...args })}
    </Text>
  );
};

export interface IFormattedMessageProps extends TextProps {
  scope: string | null;
  options?: Object;
  args?: Object;
}

export { FormattedMessage };
