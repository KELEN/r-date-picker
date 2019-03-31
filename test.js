const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

console.log(moment.range('2019-01-02', '2019-03-02').contains('2019-01-02'))