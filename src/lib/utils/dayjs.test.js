import {
  getDateArray,
} from './dayjs';

describe('css prefix', () => {
  test('get current month array', () => {
    const dateArray = getDateArray();
    expect(dateArray).toMatchSnapshot();
  });

  test('get custom month array', () => {
    const dateArray = getDateArray('2021-04');
    expect(dateArray).toMatchSnapshot();
  });
});
