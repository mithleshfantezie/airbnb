import moment from 'moment';
import titleize from 'titleize';


export const rentalType = isshared => isshared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titleize(value) : '';

export const pretifyDate = date => moment(date).format('MMM Do YY')


export const getRangeOfDates = (startAt, endAt, dateFormat = 'Y/MM/DD' ) => {
  const tempDates = [];
  const mendAt = moment(endAt);
  let mstartAt = moment(startAt);

  while(mstartAt < mendAt) {
    tempDates.push(mstartAt.format(dateFormat));
    mstartAt = mstartAt.add(1,'days');
  }

tempDates.push(mendAt.format(dateFormat));


  return tempDates;
}


export const checkExpired = (startAt) => {
  const now = moment(Date.now());
  const start = moment(startAt);

  if(start > now) {
    return 'Upcoming!!';
  }else{
    return 'Expired!'
  }

}
