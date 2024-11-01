import firestore from '@react-native-firebase/firestore';
import {deleteDocument} from './deleteDocument';
import {Alert} from 'react-native';
import {IActivity} from '../types';

export const addActivity = async (userId: string, newItem: IActivity) => {
  const day = newItem.time.getDay() - 1;
  const month = newItem.time.getMonth();

  console.log(newItem.time.getUTCMonth());

  try {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc(`${newItem.time.getUTCDate()}.${newItem.time.getUTCMonth()}`);

    // Retrieve the document
    const doc = await docRef.get();
    const [docDay, docMonth] = doc.id.split('.');
    if (!doc.exists) {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('activities')
        .doc(`${newItem.time.getUTCDate()}.${newItem.time.getUTCMonth()}`)
        .set({
          activities: [newItem],
        });
      console.log('new doc created');
      //if existing doc day and month is not equal to todays (month after) refresh doc
    } else if (
      docDay === String(newItem.time.getUTCDate()) &&
      docMonth !== String(newItem.time.getUTCMonth())
    ) {
      deleteDocument(`users/${userId}/activities`, doc.id);
    } else {
      const currentActivities = doc.data()!.activities || [];

      // Add the new item to the food array
      currentActivities.push(newItem);

      // Update the document with the extended food array
      await docRef.update({
        activities: currentActivities,
      });
    }

    console.log('Food item added successfully');
  } catch (error) {
    console.error('Error adding food item:', error);
  }
};
