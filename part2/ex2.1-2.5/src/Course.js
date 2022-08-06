const Course = ({courses}) => {
    const exArray = courses.parts.map(part => part.exercises)
    const sum = exArray.reduce((partialSum,a) => partialSum+a,0)
    return (
      <div>
        <h1>{courses.name}</h1>
        <ul>
        {courses.parts.map(part =>
          <li key={part.id}>{part.name} {part.exercises}</li>
        )}
        </ul>
        <div>total: {sum}</div>
      </div>
    )
  }

export default Course