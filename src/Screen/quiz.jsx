import { useState, useEffect } from "react"
import Rating from "../Component/ratings.jsx"
// import Timer from '../Component/timer'
import 'antd/dist/antd.css';
import { Progress, Tooltip } from 'antd';
import { data } from '../Utils/quizQuestion.jsx'

function Quiz() {
    const [change, setChange] = useState(0);
    const [remider, setRemider] = useState(100)
    const [minus, setMinus] = useState(5)
    const [TopProgress, setTopProgress] = useState(0)
    const [results, setResults] = useState(true)
    const [marks, setMarks] = useState(0)
    const [progressWrong, setProgressWrong] = useState(0)
    const [progressRight, setProgressRight] = useState(0)
    const [disbled, setDisabled] = useState(false)
    const [seconds, setSeconds] = useState(60)
    const [minutes, setMinutes] = useState(5)

    const name = localStorage.getItem("name")
    let timer;
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds - 1)
            if (seconds === 0) {
                setMinutes(minutes - 1)
                setSeconds(60)
            }
        }, 1000);
        return () => clearInterval(timer)
    })
    function next() {
        setChange(change + 1)
        setTopProgress(TopProgress + 5)
        setDisabled(false)
        let button1 = document.getElementById("button1")
        let button2 = document.getElementById("button2")
        let button3 = document.getElementById("button3")
        let button4 = document.getElementById("button4")
        button1.style.opacity = '1'
        button2.style.opacity = '1'
        button3.style.opacity = '1'
        button4.style.opacity = '1'
    }
    const result = () => {
        setResults(false)
    }
    const buttonTest = (e) => {
        console.log('e', e)
        let button1 = document.getElementById("button1")
        let button2 = document.getElementById("button2")
        let button3 = document.getElementById("button3")
        let button4 = document.getElementById("button4")
        if (e === data[change + 1].incorrect_answers[0] || e === data[change + 1].incorrect_answers[1] || e === data[change + 1].incorrect_answers[2]) {
            setProgressWrong(progressWrong + 5)
        }
        else if (e === data[change + 1].correct_answer) {
            setProgressRight(progressRight + 5)
        }
        setDisabled(true)
        if (e === data[change + 1].incorrect_answers[0]) {
            setRemider(remider - minus)
            button2.style.opacity = '0.4'
            button3.style.opacity = '0.4'
            button4.style.opacity = '0.4'
        }
        else if (e === data[change + 1].incorrect_answers[1]) {
            setRemider(remider - minus)
            button3.style.opacity = '0.4'
            button4.style.opacity = '0.4'
            button1.style.opacity = '0.4'
        }
        else if (e === data[change + 1].incorrect_answers[2]) {
            setRemider(remider - minus)
            button1.style.opacity = '0.4'
            button2.style.opacity = '0.4'
            button4.style.opacity = '0.4'
        }
        else if (e === data[change + 1].correct_answer) {
            button1.style.opacity = '0.4'
            button2.style.opacity = '0.4'
            button3.style.opacity = '0.4'
            setMarks(marks + 5)
        }

    }
    return (
        <>
            {results && minutes != 0
                ?
                <div className="main_section">
                    <div className="span"><Progress percent={TopProgress + 5} size="smallar" /></div>
                    <h1> Question {[change + 1]} of 20</h1>
                    <h3>{data[change + 1]?.category}</h3>
                    <div className="timer">
                        <span>{minutes}:{seconds}
                        </span>

                    </div>
                    <Rating />
                    <p className="para" >{data[change + 1].question}</p>
                    <div>
                        <button id="button1" disabled={disbled} className="button" onClick={() => buttonTest(data[change + 1].incorrect_answers[0])}>{data[change + 1].incorrect_answers[0]}</button>
                        <button id="button2" disabled={disbled} className="button" onClick={() => buttonTest(data[change + 1].incorrect_answers[1])}>{data[change + 1].incorrect_answers[1]}</button>
                    </div>
                    <div>
                        <button id="button3" disabled={disbled} className="button" onClick={() => buttonTest(data[change + 1].incorrect_answers[2])}>{data[change + 1].incorrect_answers[2]}</button>
                        <button id="button4" disabled={disbled} className="button" onClick={() => buttonTest(data[change + 1].correct_answer)}>{data[change + 1].correct_answer}</button>
                    </div>
                    <div className="progres">
                        <Tooltip title="Your Percentage">
                            <Progress strokeColor={'red'} percent={progressWrong} success={{ percent: progressRight }} />
                        </Tooltip>
                    </div>
                    <div className="progres">
                        <Tooltip title="Your Percentage">
                            <Progress strokeColor={'#52c41a'} percent={remider} success={{ percent: minus }} />
                        </Tooltip>
                    </div>
                    {
                        change === 19 || disbled === false
                            ?
                            <div><button id="btn" style={{ display: 'none' }} >NEXT</button></div>
                            :
                            <div><button id="btn" onClick={next} >NEXT</button></div>
                    }
                    {
                        change !== 19
                            ?
                            <>
                                <div><button id="result_btn" className="res_none">Result</button></div>
                            </>
                            : <div><button id="result_btn" onClick={result}>Result</button></div>
                    }
                </div>
                :
                <div className="Result">
                    <h1>Result</h1>
                    <h1 className="marks">{name} Your  Score is :  {marks}</h1>
                    <div className="result_progress">
                        <Tooltip title="Your Percentage">
                            <Progress strokeColor={'red'} percent={progressWrong} success={{ percent: progressRight }} />
                        </Tooltip>
                    </div>
                </div>
            }
        </>
    )
}
export default Quiz
