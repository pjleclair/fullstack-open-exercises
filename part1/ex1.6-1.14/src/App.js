import React, { useState, useEffect } from 'react'

const Header = () => {
  return (
    <h1>Give Feedback</h1>
  )
}

const RatingButton = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticsLine = ({text, value}) => {
  return <tr><td>{text}: {value}</td></tr>
}

const Statistics = ({numGood, numNeutral, numBad, numAvg, numTotal, numPositive}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine
            text="good"
            value={numGood}
          />
          <StatisticsLine
            text="neutral"
            value={numNeutral}
          />   
          <StatisticsLine
            text="bad"
            value={numBad}
          />
          <StatisticsLine
            text="total"
            value={numTotal}
          />   
          <StatisticsLine
            text="average"
            value={numAvg}
          />   
          <StatisticsLine
            text="% positive"
            value={numPositive}
          /> 
        </tbody>
      </table>
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
      pos = ((good/total)*100).toFixed(1)
    }
    setAverage(avg)
    setPositive(pos)
  },[good,bad,neutral,total])

  const handleClick = (event) => {
    console.log(event.target.textContent)
    const {textContent: buttonName} = event.target
    setTotal(prevCount => prevCount+1)
    if (buttonName === "good") {
      setGood(prevGood => prevGood+1)
    } else if (buttonName === "neutral") {
      setNeutral(prevNeutral => prevNeutral+1)
    } else {
      setBad(prevBad=>prevBad+1)
    }
  }

  return (
    <div>
      <Header />
      <RatingButton 
        onClick={handleClick}
        text="good"
      />
      <RatingButton 
        onClick={handleClick}
        text="neutral"
      />
      <RatingButton 
        onClick={handleClick}
        text="bad"
      />
      {total ? <Statistics
        numGood={good}
        numNeutral={neutral}
        numBad={bad}
        numTotal={total}
        numAvg={average}
        numPositive={positive}
      /> : <div><br />No feedback given.</div>}
    </div>
  )
}

export default App