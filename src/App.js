import React, { useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const postUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <Form postUser={postUser}/>
    </div>
  );
}

export default App;
