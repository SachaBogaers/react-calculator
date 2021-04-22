import './App.css';
import Button from './Button'
import Display from './Display'
import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState(0)

  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const operators = ["add", "subtract", "multiply", "divide"]

  const handleButtonClick = (event) => {
    const id = event.target.id
    const value = event.target.value
    let type = ""
    if (numbers.includes(id) || operators.includes(id) || id === "decimal") {
      type = "input"
    } else if (id === "clear") {
      type = "clear"
    } else if (id === "equals") {
      type = "equals"
    }
    switch (type) {
      case "input":
        setDisplay(prevState => {
          if (prevState === 0) {
            if (value === "0") {
              return 0
            } else {
              return value
            }
          } else {
            // console.log(typeof prevState, typeof value)
            // if (prevState.toString().indexOf(".") > -1) {
            //   return prevState
            // }
            return prevState + value
          }
        })
        break;
      case "clear":
        setDisplay(0)
        break;
      case "equals":
        try {
          const output = +eval(display).toFixed(4)
          setDisplay(output)
        }
        catch (err) {
          alert(err.message)
        }
    }
  }

  const numberButtons = numbers.map((number, index) => (
    <Button type="numberButton" value={index} id={number} key={index} handleButtonClick={handleButtonClick} />))

  const operatorButtons = operators.map((operator) => {
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
        value = "C";
        break;
      default:
        break;
    }
    return <Button value={value} id={operator} key={operator} handleButtonClick={handleButtonClick} />
  })

  return (
    <div className="App">
      <main className="Calculator">
        <Display display={display} />
        {numberButtons}
        {operatorButtons}
        <Button id="decimal" key="decimal" value="." handleButtonClick={handleButtonClick} />
        <Button id="clear" key="clear" value="C" handleButtonClick={handleButtonClick} />
        <Button id="equals" key="equals" value="=" handleButtonClick={handleButtonClick} />
      </main>
    </div>
  );
}

export default App;
