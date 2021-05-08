import configDayjs from '../lib/utils/dayjs';

test('iso week day', () => {
  const dayjs = configDayjs({
    isoWeek: true,
  })
})