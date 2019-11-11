import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td> <td>{props.value}</td>
        </tr>
    )
};

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <Statistic text="good" value={props.good}/>
            <Statistic text="neutral" value={props.neutral}/>
            <Statistic text="bad" value={props.bad}/>
            <Statistic text="all" value={props.total}/>
            <Statistic text="average" value={(props.good - props.bad) / props.total}/>
            <Statistic text="positive" value={((props.good / props.total) * 100).toFixed(2) + ' %'}/>
        </div>
    )
}


const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)


    const handleGoodClick = () => {
        console.log('handleGoodClick')
        setGood(good + 1)
        setTotal(total + 1)
    }

    const handleNeutralClick = () => {
        console.log('handleNeutralClick')
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }

    const handleBadClick = () => {
        console.log('handleBadClick')
        setBad(bad + 1)
        setTotal(total + 1)
    }


    console.log('rendering...')
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good'/>
            <Button onClick={handleNeutralClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>


            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)
