## r-date-picker

基于react的日历选择组件，项目依赖于```momentjs```

## Introduce

 - 方便定制样式
 - 动画切换特效
 - 方便定制渲染项

### DatePicker

```javascript
<DatePicker defaultDate={ moment('2019-04-01') }  />
```

#### 可选项

| 属性 | 值类型 | 例子 | 说明 |
| ------------ | ------------ | ------------ | -- |
| min | moment object  |  moment('2019-04-01')  | 可以切换的最小日历 |
| max | moment object  |  moment('2019-04-01')  | 可以切换的最大日历 |
| defaultDate  | moment对象或者moment数组 | moment('2019-04-01') | 默认选中值，对象是选中单个值，数组是选择范围 |
| range | bool | true/false | 是否选择范围 |
| onMonthChange | function | | 月改变事件 |
| onDateChange | function | | 日期选择回调 |
| onDateRangeChange | function |  | 范围选择回调 |
| itemRender | function |  | 自定义渲染项 |

##### itemRender属性

自定义渲染项，可以绘制头像，绘制任意除了数字以外的其他信息，值是一个函数

```javascript
<DatePicker itemRender={ 
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
      }/>
```

### DateRangePicker 

```javascript
<DateRangePicker />
```


### Development
```bash
npm i
npm run start
```