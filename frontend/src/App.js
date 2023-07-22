//import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [name,newName] = useState('');
  const [location,newLocation] = useState('');
  const [date,newDate] = useState('');
  const [time,newTime] = useState('');
  const [capacity , newCapacity] = useState('');
  const [description, newDescription] = useState('')

  const createEvent = ()=>{
    console.log(name , location , date , time , capacity , description)
  }





  return (
    <div className="App">
     <h1>Event Management System</h1>
     <div id='form'>
      <h2>Create New Event</h2>
      <div>
      Event Name :<input type='text' value={name} onChange={(e)=>newName(e.target.value)}/>
      </div>
      <div>
      Event Location : <input type='text' value={location} onChange={(e)=>newLocation(e.target.value)}/>
      </div>
      <div>
      Event Date : <input type="date" value={date} onChange={(e)=>newDate(e.target.value)}/>
      </div>
      <div>
      Event Time : <input type="time" value={time} onChange={(e)=>newTime(e.target.value)}/>
      </div>
      <div>
      Event Capacity : <input type="number" value={capacity} onChange={(e)=>newCapacity(e.target.value)}/>
      </div>
      <div>
      Event Description : <input type='text' value={description} onChange={(e)=>newDescription(e.target.value)}/>
      </div>
      <div>
        <button onClick={createEvent}>Create</button>
      </div>
      
     </div>
    </div>
  );
}

export default App;
