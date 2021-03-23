import { useState, useEffect } from "react";

import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner, Row, Col} from 'react-bootstrap';

import Item from "../../components/Item";

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

	const [snapshots, loading, error] = useList(firebase.database().ref('/alice/items'));
	const [companies, changeCompanies] = useState([])

	const findPair = () => {
		let numOfStartups = snapshots.length

		let firstCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0
		let secondCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0

		if (firstCo === secondCo) {
			secondCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0
		}

		return [snapshots[firstCo].val(), snapshots[secondCo].val()]
	}

	if (snapshots.length > 0) {
		return(
			<Container>
				<h1>Startups</h1>
				<Button
					hidden={companies.length > 0}
					onClick={() => changeCompanies(findPair())}
				>
					Start
				</Button>
				{ companies.length > 0 ? <Row>
						<Col xs="auto">
							<a 
								onClick={() => changeCompanies(findPair())}
							>
								<Item 
									info={companies[0].info} 
								/>
							</a>
						</Col>
						<Col xs="auto">
							<a
								onClick={() => changeCompanies(findPair())}
							>
								<Item 
									info={companies[1].info} 
								/>
							</a>
						</Col>
					</Row>
					: ""
				}
			</Container>
		)
	} else {
		return(
			<Spinner animation="border" variant="primary" />
		)
	}

}

export default Startups;