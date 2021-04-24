import Button from './Button'

function Buttons(props) {
	const numberButtons = props.numbers.map((number, index) => {
		return < Button type="numberButton" value={9 - index} id={number} key={9 - index} handleButtonClick={props.handleButtonClick} />
	})

	const operatorButtons = props.operators.map((operator) => {
		let value = "+"
		switch (operator) {
			case "subtract":
				value = "-";
				break;
			case "multiply":
				value = "*";
				break;
			case "divide":
				value = "/"
				break;
			case "decimal":
				value = "."
				break;
			case "clear":
				value = "C"
				break;
			case "equals":
				value = "="
				break;
			default:
				break;
		}
		return <Button type="operatorButton" value={value} id={operator} key={operator} handleButtonClick={props.handleButtonClick} />
	})

	return (
		<div id="Buttons">
			{numberButtons}
			{operatorButtons}
		</div>
	);
}

export default Buttons;
