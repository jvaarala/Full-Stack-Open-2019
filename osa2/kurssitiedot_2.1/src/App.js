import React from 'react'
import Course from "./components/Course";

const App = (props) => {


    const mapCourses = () => props.courses.map(course => <Course key={course.name} course={course}/>)

    return (
        <div>
            {mapCourses()}
        </div>
    )
}

export default App