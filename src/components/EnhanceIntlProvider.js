import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import en from '../languages/en';
import cn from '../languages/cn';

const defaultMessages = {
  en,
  cn,
};

const EnhanceIntlProvider = (Component) => class extends React.Component {
    static propTypes = {
      language: PropTypes.string,
      localeMessage: PropTypes.shape(),
    };

    static defaultProps = {
      localeMessage: {},
      language: 'cn',
    };

    render() {
      const {
        language,
        localeMessage,
      } = this.props;

      let messages = localeMessage[language] || defaultMessages[language];
      if (messages) {
        messages = Object.assign(messages, localeMessage[language]);
      } else {
        console.warn(`The defaultMessages doesn't contain key ${language}`);
      }
      return (
        <IntlProvider locale="en" messages={messages}>
          <Component {...this.props} />
        </IntlProvider>
      );
    }
};

export default EnhanceIntlProvider;
