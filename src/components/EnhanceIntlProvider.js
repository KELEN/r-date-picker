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
        localeMessages,
      } = this.props;

      let messages = localeMessages[language] || defaultMessages[language];
      if (messages) {
        messages = Object.assign(messages, localeMessages[language]);
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
    localeMessages: PropTypes.shape(),
  };

  MComponent.defaultProps = {
    localeMessages: {},
  };

  return MComponent;
};

export default EnhanceIntlProvider;
