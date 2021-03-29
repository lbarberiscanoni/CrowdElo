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

	let dimension = ""

	useEffect(() => {
		dimension = window.location.href.split("?")[1]
	})

	const findPair = () => {
		let numOfStartups = snapshots.length

		let firstCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0
		let secondCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0

		if (firstCo === secondCo) {
			secondCo = Math.floor(Math.random() * (numOfStartups - 0 + 1) ) + 0
		}

		return [{"co": snapshots[firstCo].val(), "key": firstCo}, {"co": snapshots[secondCo].val(), "key": secondCo }]
	}

	const elo = (playerScore, opponentScore, winStatus) => {
		//https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details

		const k_factor = 15

		const spread = opponentScore - playerScore
		const normalized_spread = spread / 400
		const expectation = 1 / (1 + (10 ** normalized_spread))
		const adjusted_score = playerScore + (k_factor * (winStatus - expectation))

		return adjusted_score
	}

	const updateMatchup = (winnerRef) => {
		const loserRef = 1 - winnerRef
		const winner_key = companies[winnerRef]["key"]
		const loser_key = companies[loserRef]["key"]
		const currentScore_winner = snapshots[winner_key].val()["dimensions"][dimension]
		const currentScore_loser = snapshots[loser_key].val()["dimensions"][dimension]
		const updatedScore_winner = elo(currentScore_winner, currentScore_loser, 1)
		const updatedScore_loser = elo(currentScore_loser, currentScore_winner, 0)

		let update = {}
		update[dimension] = updatedScore_winner
		firebase.database()
			.ref('/alice/items')
			.child(winner_key)
			.child("dimensions")
			.update(update)

		update[dimension] = updatedScore_loser
		firebase.database()
			.ref('/alice/items')
			.child(loser_key)
			.child("dimensions")
			.update(update)

		changeCompanies(findPair())
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
							<Item 
								info={companies[0]["co"].info} 
							/>
							<Button 
								onClick={() => updateMatchup(0)}
							>
								Most { window.location.href.split("?")[1] }
							</Button>
						</Col>
						<Col xs="auto">
							<Item 
								info={companies[1]["co"].info} 
							/>
							<Button 
								onClick={() => updateMatchup(1)}
							>
								Most { window.location.href.split("?")[1] }
							</Button>
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