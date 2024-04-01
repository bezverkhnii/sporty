import moment from 'moment';

export const formatDate = selectedDate => {
  return moment(selectedDate).calendar();
};
