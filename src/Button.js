function Button(props) {
	const type = props.type
	return (
		<button onClick={props.handleButtonClick} value={props.value} className={`Button ${type}`} id={props.id}>{props.value}</button>
	);
}

export default Button;
