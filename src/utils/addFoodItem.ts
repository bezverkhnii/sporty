import firestore from '@react-native-firebase/firestore';
import {deleteDocument} from './deleteDocument';

export const addFoodItem = async (userId, dayId, newItem) => {
  const [day, month] = dayId.split('.');
  try {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('products')
      .doc(dayId);

    // Retrieve the document
    const doc = await docRef.get();
    const [docDay, docMonth] = doc.id.split('.');
    if (!doc.exists) {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('products')
        .doc(dayId)
        .set({
          food: [newItem],
        });
      console.log('new doc created');
      //if existing doc day and month is not equal to todays (month after) refresh doc
    } else if (docDay === day && docMonth !== month) {
      deleteDocument(`users/${userId}/products`, doc.id);
    } else {
      // Get the current food array
      const currentFood = doc.data().food || [];

      // Add the new item to the food array
      currentFood.push(newItem);

      // Update the document with the extended food array
      await docRef.update({
        food: currentFood,
      });
    }

    console.log('Food item added successfully');
  } catch (error) {
    console.error('Error adding food item:', error);
  }
};
