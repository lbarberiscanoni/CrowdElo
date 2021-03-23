import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

const Item = (props) => {

	return(
		<Card>
			<Card.Body>
				<Card.Title>
					{ props.info["Name"] }
				</Card.Title>
				<Card.Subtitle>
					{ props.info["Stage"] }
				</Card.Subtitle>
				<Card.Text>
					{ props.info["Product(s)"] }
				</Card.Text>
				<Card.Link href="#">
					{ props.choiceType }
				</Card.Link>
			</Card.Body>
		</Card>
	)

}

export default Item;