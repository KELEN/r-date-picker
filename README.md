<h1 align="center">
  React日期选择器
</h1>

## 特点

 1. 可以随意定制样式
 2. 支持单选，范围选择
 3. 支持多个日历选择

## [Demo](https://kelen.github.io/r-date-picker/?path=/story/calendar-calendar--pure-render)

## 🚅  Quick start

**安装**

```shell
npm install r-date-picker -S
```

**使用**

```javascript
<DatePicker
  className="container"
  range={false}
  min={dayjs().subtract(1, 'day')}
  max={dayjs().add(6, 'day')}
  value={value}
  onChange={(val) => {
    setValue(val);
  }}
/>
```