import dayjs, {
  getDateArray,
} from './dayjs';

describe('css prefix', () => {
  test('2021-05月份的周日为2021-04-25', () => {
    const dateArray = getDateArray();
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2021-04-25');
  });

  test('2021-04月份的开始和结束日期分别是2021-03-28和2021-05-08', () => {
    const dateArray = getDateArray('2021-04');
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2021-03-28');
    expect(dateArray[5][6].date.format('YYYY-MM-DD')).toEqual('2021-05-08');
  });

  test('2021-05月份的周一为2021-04-26', () => {
    const dateArray = getDateArray(dayjs('2021-05-01'), true);
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2021-04-26');
  });
});
