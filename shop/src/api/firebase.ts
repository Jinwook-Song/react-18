import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { UserModel } from '../models';
import { ProductType } from '../pages/NewProduct';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();
const provider = new GoogleAuthProvider();

enum FIRESTORE_COLLECTIONS {
  users = 'users',
  products = 'products',
}

export async function login() {
  try {
    const cred = await signInWithPopup(auth, provider);
    const uid = cred.user.uid;

    const docRef = doc(firestore, FIRESTORE_COLLECTIONS.users, uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(firestore, FIRESTORE_COLLECTIONS.users, uid), {
        role: 'none',
        uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
}

export async function logout() {
  await signOut(auth);
}

export async function onUserStateChange(
  callback: (user: UserModel | null) => void,
) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const isAdmin = await adminUser(user);
      const userModel: UserModel = { ...user, isAdmin };
      callback(userModel);
    } else {
      callback(null);
    }
  });
}

async function adminUser(user: User) {
  const docRef = doc(firestore, FIRESTORE_COLLECTIONS.users, user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()!['role'] === 'admin';
}

export async function addNewProduct(product: ProductType) {
  await setDoc(doc(firestore, FIRESTORE_COLLECTIONS.products, product.id), {
    ...product,
    options: product.options.split(','),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function getProducts() {
  const q = query(
    collection(firestore, FIRESTORE_COLLECTIONS.products),
    orderBy('createdAt', 'desc'),
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data, options: data.options.join(',') } as ProductType;
  });
}
