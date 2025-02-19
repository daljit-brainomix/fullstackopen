const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Part = (props) => {
  return (
    <>
      <p>
        {props.name}: {props.exercises}
      </p>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}
const Total = (props) => {
  return (
    <>
      <p>
      Number of exercises: {props.total}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div> DD
      <Header course={course} />
      
      <Content parts={[{name: part1.name, exercises: part1.exercises}, {name: part2.name, exercises: part2.exercises}, {name: part3.name, exercises: part3.exercises},]} />

      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )

}

export default App
