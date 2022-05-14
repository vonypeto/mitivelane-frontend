//currently running development
const FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export default FirebaseConfig;

//production
// export default FirebaseConfig;
// const firebaseConfig = {
//   apiKey: "AIzaSyCAAc0g25FpI-SP_EA_UJfitoa7srldN68",
//   authDomain: "organization-production.firebaseapp.com",
//   databaseURL: "https://organization-production-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "organization-production",
//   storageBucket: "organization-production.appspot.com",
//   messagingSenderId: "411790228525",
//   appId: "1:411790228525:web:de1b2c97e032e2920b0ca4",
//   measurementId: "G-0FY64HXB2X"
// };

//development

// const FirebaseConfig = {
//   apiKey: "AIzaSyBvQkJqwD7QoVOqqV8lqLiUKYXvbYFfGJo",
//   authDomain: "organization-dev.firebaseapp.com",
//   databaseURL:
//     "https://organization-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "organization-dev",
//   storageBucket: "organization-dev.appspot.com",
//   messagingSenderId: "649867115560",
//   appId: "1:649867115560:web:1477467cdadddab2eac91d",
// };
