import { useState } from 'react'

const Header = () => {
  return (
    <h1>Give Feedback</h1>
  )
}

const RatingButtons = (props) => {
  return (
    <div>
      <button id="button--good" onClick={props.onClick}>good</button>
      <button id="button--neutral" onClick={props.onClick}>neutral</button>
      <button id="button--bad" onClick={props.onClick}>bad</button>
    </div>
  )
}

const NumberCounter = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <div>good: {props.numGood}</div>
        <div>neutral: {props.numNeutral}</div>
        <div>bad: {props.numBad}</div>
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (event) => {
    console.log(event.target.id)
    const {id: buttonName} = event.target
    console.log(buttonName)
    if (buttonName === "button--good") {
      setGood(prevCount => prevCount+1)
    } else if (buttonName === "button--neutral") {
      setNeutral(prevCount => prevCount+1)
    } else {
      setBad(prevCount => prevCount+1)
    }
  }

  return (
    <div>
      <Header />
      <RatingButtons 
        onClick={handleClick}
      />
      <NumberCounter
        numGood={good}
        numNeutral={neutral}
        numBad={bad}
      />
    </div>
  )
}

export default App