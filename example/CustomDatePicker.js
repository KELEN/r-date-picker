import React from 'react'
import DatePicker from '../src/components/DatePicker'

class CustomDatePicker extends React.Component {

  render() {
    return (
      <DatePicker
        itemRender={ 
          (item) => { 
            const markDays = {
              20190329: {
                avator: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4208386305,57701306&fm=27&gp=0.jpg'
              },
              20190327: {
                avator: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg'
              }
            }
            let mark, target
            if (item.date && (target = markDays[item.date.format('YYYYMMDD')])) {
              mark = (<div style={{ 
                backgroundImage: `url(${ target.avator })`, 
                borderRadius: '50%',
                backgroundSize: 'contain',
                width: 40,
                height: 40
              }}></div>)
            } else {
              mark = (<div data-label={ item.key }>{ item.num }</div>)
            }
            return mark
          } 
        } />
    )
  }
}

export default CustomDatePicker