import moment from 'moment';
import titleize from 'titleize';


export const rentalType = isshared => isshared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titleize(value) : '';

export const pretifyDate = date => moment(date).format('MMM Do YY')


export const getRangeOfDates = (startAt, endAt, dateFormat = 'Y/MM/DD' ) => {
  const tempDates = [];
  const mendAt = moment(endAt);
  let mstartAt = moment(startAt);

  while(startAt < endAt) {
    tempDates.push(moment(startAt).format(dateFormat));
    mstartAt = mstartAt.add(1,'day');
  }

  tempDates.push(mendAt.format(dateFormat));

  return tempDates;
}
