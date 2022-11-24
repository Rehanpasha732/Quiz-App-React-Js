import React, { useState } from 'react'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

function Form() {
  const [name, setName] = useState("")
const submit = () => {
  if (name ===  "" ){
    swal("Fill it")
  }
  else {
    localStorage.setItem("name",name)
  }
}

  return (
    <>

      <div className="form">
        <div className="header">
          <h1 className='heading'>Online Quiz</h1>
          <p className='quiz_p'>You have 5 minutes to take the quiz.</p>

        </div>
        <div className="inner_section">
          <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }} />
          {
            name === ""
              ?
              <button onClick={submit} className='start_quiz' style={{ color: 'white' }}>Start Quiz</button>
              :
              <button className='start_quiz' ><Link to='/quiz' onClick={submit} style={{ color: 'white' }} >Start Quiz</Link></button>
          }

        </div>
      </div>

    </>
  )
}

export default Form

