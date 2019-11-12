import React from 'react'

const Header = ({object}) => {
    console.log(object)
    return (
        <div><h1>{object.name}</h1></div>
    )
};

const Content = (props) => {
    const rows = () => props.object.parts.map(part => <Part key={part.id} part={part}/>)
    return (
        <div>
            {rows()}
        </div>
    )
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
};

const Total = (props) => {
    const total = props.object.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
            <p><b>total of exercises {total}</b></p>
        </div>
    )
};

const Course = ({course}) => {
    console.log('passed props: ', course)
    return (
        <div>
            <Header object={course}/>
            <Content object={course}/>
            <Total object={course}/>
        </div>
    )
}

export default Course