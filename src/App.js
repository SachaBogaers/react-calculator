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
            const input = prevState.toString()
            if (input.charAt(input.length - 1) === "." && value === ".") {
              return prevState
            } else {
              const numberArray = input.split(/[*/+-]/)
              if (numberArray[numberArray.length - 1].includes(".") && value === ".") {
                return prevState
              }
            }
            return prevState + value
          }
        })
        break;
      case "clear":
        setDisplay(0)
        break;
      case "equals":
        // Work with what user had typed in on display
        let calculation = display
        // Check if there are several operators after one another
        const regex = /[*/+-]+[*/+]/g
        // If several operators, replace set with the last one
        if (regex.test(calculation)) {
          const match = calculation.match(regex)
          match.forEach(item => {
            calculation = calculation.replace(item, item.charAt(item.length - 1))
          })
        }
        try {
          const output = +eval(calculation).toFixed(4)
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
