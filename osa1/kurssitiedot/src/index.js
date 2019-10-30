import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {

    return (
        <div><h1>{props.object.name}</h1></div>
    )
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.object.parts[0]}/>
            <Part part={props.object.parts[1]}/>
            <Part part={props.object.parts[2]}/>
        </div>
    )
};

const Part = (props) => {
    console.log(props);
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
};

const Total = (props) => {
    let total = props.object.parts[0].exercises + props.object.parts[1].exercises + props.object.parts[2].exercises
    return (
            <div>
                <p>Number of exercises {total}</p>
            </div>
    )
};


const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }


    return (
        <div>
            <Header object={course}/>
            <Content object={course}/>
            <Total object={course}/>

        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
