import Quiz from '../src/Screen/quiz.jsx';
import './App.css';
import Form from './Screen/form'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      {/* <Quiz /> */}
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Form/>}></Route>
        <Route  path="/quiz" element={<Quiz/>}></Route> 
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
