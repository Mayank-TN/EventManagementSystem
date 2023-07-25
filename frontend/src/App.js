//import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [name,newName] = useState('');
  const [location,newLocation] = useState('');
  const [date,newDate] = useState('');
  const [time,newTime] = useState('');
  const [capacity , newCapacity] = useState('');
  const [description, newDescription] = useState('')
  const [events,setEvents] = useState([]);
  const [showForm , setShowForm] = useState(true);
  const [seachByLocation , setSearchByLocation] = useState('');
  const [searchByDateFrom , setSearchByDateFrom] = useState('');
  const [searchByDateTo , setSearchByDateTo] = useState('');
  const [showRegisterInput,setShowRegisterInput] = useState(false);
  const [selectedEvent , setSelectedEvent] = useState('')
  const [registerEmail , setRegisterEmail] = useState('')


  async function registerUser(event){
    console.log(event._id);
    if(registerEmail.trim === ""){
      alert('Email is required')
    }
    else{
    const res = await fetch("http://localhost:5000/" + event._id, {
      method : "PUT" ,
      headers : {
        "content-type" : "application/json",
        "accept" : "application/json"
      },
      body : JSON.stringify({ email : registerEmail})
    })
    const resp = await res.json();
    alert(resp.message)
    setRegisterEmail('')
    setShowRegisterInput(false);
    getData();
  }
  }
 
  async function getData(){
    const response = await fetch("http://localhost:5000/getData")
    const data = await response.json();
    setEvents(data);}

    async function getDataByLocation(){
      if(seachByLocation.trim()===""){
        getData();
      }
      else{
        const response = await fetch("http://localhost:5000/getData?location=" + seachByLocation)
      const data = await response.json();
      setEvents(data);}
      }


      async function getDataByDate(){
        let dateFromFormat = `${searchByDateFrom.split("-")[2]}-${searchByDateFrom.split("-")[1]}-${searchByDateFrom.split("-")[0]}`
        let dateToFormat = `${searchByDateTo.split("-")[2]}-${searchByDateTo.split("-")[1]}-${searchByDateTo.split("-")[0]}`
        // if(searchByDateFrom==="" || searchByDateTo===""){
        //   getData();
        // }
         if(searchByDateFrom && searchByDateTo===""){
          const response = await fetch("http://localhost:5000/getData?from=" + dateFromFormat)
        const data = await response.json();
        setEvents(data);
        }
        else if(searchByDateFrom==="" && searchByDateTo){
          const response = await fetch("http://localhost:5000/getData?to=" + dateToFormat)
        const data = await response.json();
        setEvents(data);}
        else{
          const response = await fetch("http://localhost:5000/getData?from=" + dateFromFormat + '&to=' + dateToFormat)
        const data = await response.json();
        setEvents(data);}
        }
      
 

  useEffect( ()=>{
     getData()
    }

  , [])

  


  const createEvent = async ()=>{
    let timeFormat = '';
    if(time.split(":")[0] > 12){
     timeFormat = `${time.split(":")[0]-12}:${time.split(":")[1]}PM`
    }
    else{
      timeFormat = `${time.split(":")[0]}:${time.split(":")[1]}AM`
    }

    const dateFormat = `${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`
    const newEvent = {
      eventName : name,
      location : location,
      date : dateFormat,
      time : timeFormat,
      maximumParticipantsAllowed : capacity,
      description : description
    }
    console.log(newEvent)
    const res = await fetch("http://localhost:5000/" , {
      method : "POST" ,
      headers : {
        "content-type" : "application/json",
        "accept" : "application/json"
      },
      body : JSON.stringify(newEvent)
    })
    const resp = await res.json();
    alert(resp.message)
    newName('');
    newCapacity('')
    newDate('')
    newDescription('')
    newLocation('')
    newTime('')
  }

  return (
    <div className="App">
     <h1>Event Management System</h1>
     <button onClick={()=>setShowForm(true)}>Create New Event</button>
     <button onClick={()=>{setShowForm(false); getData()}}>Show All Events</button>
     <br/><br/>
     {
      showForm ? <div id='form'>
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
      
     </div> :    <div id="container">
     <div>
     <span>Search By Location : <input type='text' value={seachByLocation} onChange={(e)=>setSearchByLocation(e.target.value)}/></span>
     <button onClick={getDataByLocation}>Search</button>
     <div>
     <span>Search By Date From : <input type='date' value={searchByDateFrom} onChange={(e)=>setSearchByDateFrom(e.target.value)}/></span>
     <span>Search By Date To : <input type='date' value={searchByDateTo} onChange={(e)=>setSearchByDateTo(e.target.value)}/></span>
     <button onClick={getDataByDate}>Search</button>
     </div>
     </div><br/>
      {
        
        events.map( (event =>
          <div id="card">
          <span>Event Name : {event.eventName}</span><br/>
          <span>Location : {event.location}</span><br/>
          <span>MaximumParticipantsAllowed : {event.maximumParticipantsAllowed}</span><br/>
          <span>ActiveParticipants : {event.activeParticipants}</span><br/>
          <span>Description : {event.description}</span><br/>
          <span>Event Date : {new Date(parseInt(event.datetime.split(" ")[0].split("-")[2]), parseInt(event.datetime.split(" ")[0].split("-")[1]-1),parseInt(event.datetime.split(" ")[0].split("-")[0])).toLocaleDateString()}</span><br/>
          <span>Event Time : {event.datetime.split(" ")[1]}</span><br/>
         {
          showRegisterInput ? '' : 
          <button onClick={()=>{ setShowRegisterInput(true); setSelectedEvent(event._id) ; console.log(event)}}>Register</button>
         }
         
         
          
          {
            showRegisterInput && selectedEvent===event._id ? <div>
              <input type='email' onChange={(e)=>setRegisterEmail(e.target.value)} value={registerEmail}/>
              <button onClick={()=>registerUser(event)}>Register user</button>
            </div> : ''
          }
          </div>
          ))
      }
     </div>
     }
     
  
    </div>
  );
}

export default App;
