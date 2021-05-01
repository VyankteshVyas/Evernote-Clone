import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBoBHmuYeoghRXBo9SRFmMpCwYOEyOTrjI",
  authDomain: "evernote-clone-4e483.firebaseapp.com",
  projectId: "evernote-clone-4e483",
  storageBucket: "evernote-clone-4e483.appspot.com",
  messagingSenderId: "1083506499443",
  appId: "1:1083506499443:web:93e27f532448caa605af06"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
