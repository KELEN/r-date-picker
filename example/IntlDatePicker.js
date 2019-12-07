import React from 'react';
import DatePicker from '../src/components/DatePicker';
import './style.scss';

/**
 * 国际化
 */
export default class IntlDatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: 'cn',
    };
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(e) {
    this.setState({
      lang: e.target.value,
    });
  }

  render() {
    const { lang } = this.state;
    return (
      <div>
        <h3>国际化日历</h3>
        <select onChange={this.handleLanguageChange}>
          <option value="cn">中文</option>
          <option value="en">英文</option>
          <option value="custom">自定义</option>
        </select>
        <DatePicker
          language={lang}
          localeMessage={{
            custom: {
              year: 'a',
              month: 'b',
              day: 'c',
              sunday: 'd',
              monday: 'e',
              tuesday: 'f',
              wednesday: 'g',
              thursday: 'h',
              friday: 'i',
              saturday: 'j',
              january: 'k',
              february: 'l',
              march: 'm',
              april: 'n',
              may: 'o',
              june: 'p',
              july: 'q',
              august: 'r',
              september: 's',
              october: 't',
              november: 'u',
              december: 'v',
            },
          }}
        />
      </div>
    );
  }
}
