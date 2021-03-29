import { useState, useEffect } from "react";

import { Container, Button, Spinner, Row, Col, InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2'

const Snowflake = (props) => {
	console.log(props.data)
	const data = {
		labels: Object.keys(props.data),
		datasets: [
			{
				label: 'Score for each Dimension',
				data: Object.values(props.data),
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	}

	const options = {
		scale: {
			ticks: { beginAtZero: true },
		}
	}

	return(
		<>
			<h4>{ props.info["Name"]}</h4>
			<Radar data={data} options={options} />
		</>
	)
}

export default Snowflake;