import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtB6uH02eCheQfiDPOE4Ip60mCuKZnDHA",
  authDomain: "kolios.firebaseapp.com",
  projectId: "kolios",
  storageBucket: "kolios.appspot.com", // ✅ fixed
  messagingSenderId: "226147182247",
  appId: "1:226147182247:web:ada91416db0eb1fb465d82"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
