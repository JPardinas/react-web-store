import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA3llZziU1YcN0TemCobzaHzYuPMobVTxE",
  authDomain: "react-shop-website.firebaseapp.com",
  databaseURL: "https://react-shop-website.firebaseio.com",
  projectId: "react-shop-website",
  storageBucket: "",
  messagingSenderId: "812882359322",
  appId: "1:812882359322:web:765063542ae5f475"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  /*We passin in our initial object the initial object goes into the first new collection.
First element and it sets the first value equal to the title but in lowercase. So the first value is going to be hats.

So it'll be an empty object with a property of hearts that's equal to the heart's collection. And then it returns that object.

And it goes into the second object if the second object is say jackets then it's going to set a new property called jackets and then equal the jackets collection.

So now you have an object that has a hats property equal to the hats collection and a jacket's property equal to the jackets collection and then so on and so forth until we end up with an object where the titles of all five of the collection objects are the keys and then they equal their respective collection object.*/

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
