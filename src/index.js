import React from 'react';
import ReactDOM from 'react-dom';
import CodeArchive from './CodeArchive';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/firebase';
import './index.css';
import 'semantic-ui-css/semantic.min.css'

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<CodeArchive />, document.getElementById('root'));
