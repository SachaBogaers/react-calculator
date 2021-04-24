import './App.css';
import Buttons from './Buttons'
import Display from './Display'
import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState(0)

  const numbers = ["nine", "eight", "seven", "six", "five", "four", "three", "two", "one", "zero"]
  const operators = ["add", "subtract", "multiply", "divide", "decimal", "clear", "equals"]

  const handleButtonClick = (event) => {
    const id = event.target.id
    const value = event.target.value
    // Decide how to handle the button that was clicked
    let type = ""
    if (id === "clear") {
      type = "clear"
    } else if (id === "equals") {
      type = "equals"
    }
    else if (numbers.includes(id) || operators.includes(id) || id === "decimal") {
      type = "input"
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



  return (
    <div className="App">
      <main className="Calculator">
        <Display display={display} />
        <Buttons numbers={numbers} operators={operators} handleButtonClick={handleButtonClick} />
      </main>
    </div>
  );
}

export default App;
