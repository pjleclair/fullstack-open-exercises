import React, { useState, useEffect } from 'react'

const Header = () => {
  return (
    <h1>Give Feedback</h1>
  )
}

const RatingButtons = ({onClick}) => {
  return (
    <div>
      <button id="button--good" onClick={onClick}>good</button>
      <button id="button--neutral" onClick={onClick}>neutral</button>
      <button id="button--bad" onClick={onClick}>bad</button>
    </div>
  )
}

const NumberCounter = ({numGood, numNeutral, numBad, numAvg, numTotal, numPositive}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <div>good: {numGood}</div>
        <div>neutral: {numNeutral}</div>
        <div>bad: {numBad}</div>
        <div>total: {numTotal}</div>
        <div>average: {numAvg}</div>
        <div>% positive: {numPositive}</div>
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(()=>{
    let avg = 0
    let pos = 0
    if (total) {
      avg = ((good-bad)/total)
      pos = (good/total)
    }
    setAverage(avg)
    setPositive(pos)
  },[good,bad,neutral,total])

  const handleClick = (event) => {
    console.log(event.target.id)
    const {id: buttonName} = event.target
    setTotal(prevCount => prevCount+1)
    if (buttonName === "button--good") {
      setGood(prevGood => prevGood+1)
    } else if (buttonName === "button--neutral") {
      setNeutral(prevNeutral => prevNeutral+1)
    } else {
      setBad(prevBad=>prevBad+1)
    }
  }

  return (
    <div>
      <Header />
      <RatingButtons 
        onClick={handleClick}
      />
      {total ? <NumberCounter
        numGood={good}
        numNeutral={neutral}
        numBad={bad}
        numTotal={total}
        numAvg={average}
        numPositive={positive}
      /> : <div></div>}
    </div>
  )
}

export default App