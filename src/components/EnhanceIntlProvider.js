import React from 'react';
import { IntlProvider } from 'react-intl';
import en from '../languages/en';
import cn from '../languages/cn';

const messages = {
  en,
  cn,
};

const EnhanceIntlProvider = (Component) => {
  class MComponent extends React.Component {
    render() {
      const {
        language = 'cn',
        startDate,
        endDate,
        hoveringDate,
        className,
      } = this.props;
      return (
        <IntlProvider locale="en" messages={messages[language]}>
          <Component {...this.props} />
        </IntlProvider>
      );
    }
  }
  return MComponent;
};

export default EnhanceIntlProvider;
