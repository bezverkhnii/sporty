import firestore from '@react-native-firebase/firestore';

export const checkIfDocExists = async (userId, docId) => {
  const exists = await firestore()
    .collection('users')
    .doc(userId)
    .collection('products')
    .doc(docId)
    .get();

  //   console.log(exists.exists);
  return exists.exists;
};
