import firestore from '@react-native-firebase/firestore';

export const deleteDocument = async (collectionPath, docId) => {
  try {
    // Get reference to the document
    const docRef = firestore().collection(collectionPath).doc(docId);

    // Delete the document
    await docRef.delete();

    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
