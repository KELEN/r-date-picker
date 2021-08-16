## r-date-picker

基于react的日历选择组件，支持单选，多选

## [demo](https://kelen.github.io/r-date-picker/)

![AirbnbStyle](https://raw.githubusercontent.com/KELEN/r-date-picker/master/example/images/airbnb-style.png "AirbnbStyle")

## Introduce

 - 支持单选和范围选择
 - 可以定制渲染项
 - 日历切换动画
 - 支持一个或者两个日历选择操作
 - 支持国际化
 - 不是table渲染，灵活配置样式，通过class覆盖即可

## How to use

### install

```
npm i r-date-picker
```

### use module

```
import { DatePicker } from 'r-date-picker'
import { DateRangePicker } from 'r-date-picker'
```

### import index.less

```
import 'r-date-picker/src/styles/index.less'
```


### DatePicker

```javascript
<DatePicker defaultDate={ moment('2019-04-01') }  />
```

#### 可选项

| 属性 | 值类型 | 例子 | 说明 |
| ------------ | ------------ | ------------ | -- |
| selectable | boolean | selectable={false} | 是否可选择，默认true |
| minDate | moment object  |  moment('2019-04-01')  | 可以切换的最小日历 |
| maxDate | moment object  |  moment('2019-04-01')  | 可以切换的最大日历 |
| defaultDate  | moment对象或者moment数组 | moment('2019-04-01') | 默认选中值，对象是选中单个值，数组是选择范围 |
| ranges | array | [[]] | 二维数组，[[moment('2019-03-21'), moment('2019-03-25')], [moment('2019-03-10'), moment('2019-03-10')], [moment('2019-03-1'), moment('2019-03-4')]] |
| language | string | cn | cn/en | 
| disabledDates | array | ['2019-04-11', '2019-04-22'] | 禁止选择的日期数组 |
| onMonthChange | function | | 月改变事件 |
| onDateClick | function | 日期点击事件 | 
| onDateChange | function | | 日期选择回调 |
| onDateRangeChange | function |  | 范围选择回调 |
| itemRender | function |  | 自定义渲染项 |
| renderPrevBtn | function | | 渲染上一页按钮 |
| renderNextBtn | function | | 渲染下一页按钮 |

#### itemRender属性

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
<DatePicker 
  onDateRangeChange={ this.rangeChange } 
  range={ true }
  defaultDate={ this.state.defaultDate } 
/>
```

### 可选项

| 属性 | 值类型 | 例子 | 说明 |
| ------------ | ------------ | ------------ | -- |
| single | boolean | single={ true } | 单个日历选范围 |
| selectable | boolean | selectable={false} | 是否可选择，默认true |
| minDate | moment object  |  moment('2019-04-01')  | 可以切换的最小日历 |
| maxDate | moment object  |  moment('2019-04-01')  | 可以切换的最大日历 |
| defaultDate  | moment对象或者moment数组 | moment('2019-04-01') | 默认选中值，对象是选中单个值，数组是选择范围 |
| ranges | array | [[]] | 二维数组，[[moment('2019-03-21'), moment('2019-03-25')], [moment('2019-03-10'), moment('2019-03-10')], [moment('2019-03-1'), moment('2019-03-4')]] |
| language | string | cn | cn/en | 
| disabledDates | array | ['2019-04-11', '2019-04-22'] | 禁止选择的日期数组 |
| onMonthChange | function | | 月改变事件 |
| onDateClick | function | 日期点击事件 | 
| onDateChange | function | | 日期选择回调 |
| onDateRangeChange | function |  | 范围选择回调 |
| itemRender | function |  | 自定义渲染项 |
| renderPrevBtn | function | | 渲染上一页按钮 |
| renderNextBtn | function | | 渲染下一页按钮 |



## Custom styles class

| 类名 |  说明  |
| ------------ | ------------ |
| rdp__container | 容器 |
| range__container | 范围选择容器 |
| rdp__prev-btn | 左按钮 |
| rdp__next-btn | 右按钮 |
| rdp__days-row | 日历行 | 
| rdp__days-item | 日历day项 |
| rdp__days-item-active--single | 选中 |
| rdp__days-item-active | 选中激活 |
| rdp__days-item-active--start | 选中开始 |
| rdp__days-item-active--start | 选中连接 |
| rdp__days-item-active--end | 选中结束 |
| rdp__days-item-active--range-start | 范围开始 |
| rdp__days-item-active--range-connect | 范围连接 |
| rdp__days-item-active--range-end | 范围结束 |


## Development
```bash
npm i
npm run start
```

## Avaiable

- [x] 单日历选择日期
- [x] 单日历选择范围
- [x] 两个日历选择范围
- [x] 个性化修改样式
- [x] 范围限制
- [x] 国际化支持，只支持英文和中文
- [ ] 新增自定义国际化语言
- [ ] 选择年份