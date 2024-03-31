export const firebaseErrorToText = (error: any) => {
  return error.message.split(']')[1];
};
