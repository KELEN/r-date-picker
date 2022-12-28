import dayjs, {
  getDateArray,
} from './dayjs';

describe('css prefix', () => {
  // test('2021-05月份的周日为2021-04-25', () => {
  //   const dateArray = getDateArray();
  //   expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2021-04-25');
  // });

  // test('2021-04月份的开始和结束日期分别是2021-03-28和2021-05-08', () => {
  //   const dateArray = getDateArray('2021-04');
  //   expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2021-03-28');
  //   expect(dateArray[5][6].date.format('YYYY-MM-DD')).toEqual('2021-05-08');
  // });

  test('2022-12月份', () => {
    const dateArray = getDateArray(dayjs('2022-12-01'), {
      isoWeek: false,
    });
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2022-11-27');
    expect(dateArray[0][3].date.format('YYYY-MM-DD')).toEqual('2022-11-30');
    expect(dateArray[4][6].date.format('YYYY-MM-DD')).toEqual('2022-12-31');
    expect(dateArray[5][6].date.format('YYYY-MM-DD')).toEqual('2023-01-07');
  });

  test('2022-12月份', () => {
    const dateArray = getDateArray(dayjs('2022-12-01'), {
      isoWeek: true,
    });
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2022-11-28');
    expect(dateArray[0][3].date.format('YYYY-MM-DD')).toEqual('2022-12-01');
    expect(dateArray[4][6].date.format('YYYY-MM-DD')).toEqual('2023-01-01');
    expect(dateArray[5][6].date.format('YYYY-MM-DD')).toEqual('2023-01-08');
  });

  test('2023-1月份，周一为第一天', () => {
    const dateArray = getDateArray(dayjs('2023-01-01'), {
      isoWeek: true,
    });
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2022-12-26');
    expect(dateArray[0][6].date.format('YYYY-MM-DD')).toEqual('2023-01-01');
    expect(dateArray[4][6].date.format('YYYY-MM-DD')).toEqual('2023-01-29');
  });

  test('2023-4月份，周一为第一天', () => {
    const dateArray = getDateArray(dayjs('2023-04-01'), {
      isoWeek: true,
    });
    expect(dateArray[0][0].date.format('YYYY-MM-DD')).toEqual('2023-03-27');
    expect(dateArray[0][6].date.format('YYYY-MM-DD')).toEqual('2023-04-02');
    expect(dateArray[5][1].date.format('YYYY-MM-DD')).toEqual('2023-05-02');
  });
});
