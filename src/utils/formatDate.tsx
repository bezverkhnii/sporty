import moment from 'moment';

export const formatDate = selectedDate => {
  return moment(selectedDate).calendar();
};

export const formatSecondsToDate = seconds => {
  const milliseconds = seconds * 1000;
  return new Date(moment(milliseconds).toDate());
};
