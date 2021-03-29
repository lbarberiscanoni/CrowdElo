import { useState, useEffect } from "react";

import firebase from 'firebase';
import { useList } from 'react-firebase-hooks/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner, Row, Col, InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

import Snowflake from "../../components/Snowflake";

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

const Results = () => {

	const [snapshots, loading, error] = useList(firebase.database().ref('/alice/items'));
	const [dimensionUnderConsideration, changeDimension] = useState("interest")

	const handleChange = (e) => {
		const newDim = e.split("#")[1].toString()
		changeDimension(newDim)
	}

	if (snapshots.length > 0) {
		let vals = []
		snapshots.map((snapshot) => {
			vals.push(snapshot.val().dimensions[dimensionUnderConsideration])
		})
		return(
			<Container>
				<h1>Results for Startups</h1>
				<Row>
					<InputGroup className="mb-3">
						<Dropdown
							onSelect={handleChange}
						>
							<Dropdown.Toggle 
								variant="primary" 
								id="dropdown-basic"
							>
								Rank by Dimension
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{
									Object.keys(snapshots[0].val()["dimensions"]).map((dimension) => {
										return <Dropdown.Item href={"#" + dimension}>{ dimension }</Dropdown.Item>
									})
								}
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Row>
				{
					snapshots.sort((a, b) => {
			  			return b.val().dimensions[dimensionUnderConsideration] - a.val().dimensions[dimensionUnderConsideration]
			  		}).map((snapshot) => {
			  			console.log(vals)
						return <Row>
						<Col xs="8">
							<Snowflake 
								info={snapshot.val().info} 
								data={snapshot.val().dimensions}
								max={Math.max(...vals)}
								min={Math.min(...vals)}
							/>
						</Col>
						</Row>
					})
				}
			</Container>
		)
	} else {
		return(
			<Spinner animation="border" variant="primary" />
		)
	}

}

export default Results;