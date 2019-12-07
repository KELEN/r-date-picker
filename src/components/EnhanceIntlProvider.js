import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import en from '../languages/en';
import cn from '../languages/cn';

const defaultMessages = {
  en,
  cn,
};

const EnhanceIntlProvider = (Component) => {
  class MComponent extends React.Component {
    render() {
      const {
        language = 'cn',
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
  }

  MComponent.propTypes = {
    language: PropTypes.string,
    localeMessage: PropTypes.shape(),
  };

  MComponent.defaultProps = {
    localeMessage: {},
  };

  return MComponent;
};

export default EnhanceIntlProvider;
