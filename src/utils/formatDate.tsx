import moment from 'moment';

export const formatDate = selectedDate => {
  return moment(selectedDate).calendar();
};

export const formatSecondsToDate = seconds => {
  const milliseconds = seconds * 1000;
  return new Date(moment(milliseconds).toDate());
};

export const formatFirestoreDate = firestoreTimestamp => {
  const currentDay = moment().date();
  const currentMonth = moment().month();

  // Convert the Firestore timestamp (seconds) to milliseconds and create a new Date object
  const date = new Date(firestoreTimestamp.seconds * 1000);

  // Format the date (for example, using toLocaleDateString or custom formatting)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // You can also format the time if needed
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${
    date.getDate() === currentDay && date.getMonth() === currentMonth
      ? 'Today'
      : formattedDate
  } ${formattedTime}`;
};
