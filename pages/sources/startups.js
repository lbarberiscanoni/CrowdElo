import { useState, useEffect } from "react";

import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner } from 'react-bootstrap';

if (!firebase.apps.length) {
	firebase.initializeApp(
		{
			apiKey: "AIzaSyBkAAo5aacMEGbzTw_xfENdirDFrYa-rsY",
			authDomain: "crowdelo-4b82f.firebaseapp.com",
			databaseURL: "https://crowdelo-4b82f-default-rtdb.firebaseio.com",
			projectId: "crowdelo-4b82f",
			storageBucket: "crowdelo-4b82f.appspot.com",
			messagingSenderId: "84830591235",
			appId: "1:84830591235:web:b61fa952c51692fd0ef136",
			measurementId: "G-D0VKJYEZZM"
		}
	);
}

const Startups = () => {

	const [snapshots, loading, error] = useList(firebase.database().ref('/'));

	if (snapshots.length > 0) {
		return(
			<Container>
				<h1>Startups</h1>
				<Button>Hello</Button>
			</Container>
		)
	} else {
		return(
			<Spinner animation="border" variant="primary" />
		)
	}

}

export default Startups;