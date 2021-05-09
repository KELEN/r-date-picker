import {
  prefixClassObject,
} from './style';

describe('css prefix', () => {
  test('append css prefix', () => {
    const cls = prefixClassObject({
      container: true,
      content: false,
    });

    expect(cls).toEqual({
      rdp__container: true,
      rdp__content: false,
    });
  });
});
