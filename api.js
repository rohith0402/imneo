import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const { phone, email } = person
    const { large: image } = person.picture
    const {
      login: { password },
    } = person
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }
  useEffect(() => {
    getPerson()
  }, [])
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
function element(id) {
return document.getElementById(id);
}
let allSearchData = ""; 
function getResults() {

let search = element("search-input").value;
allSearchData = "";

hideSearchResults();
clearSearchResults();
clearSearchData(); //

if (search.length > 1) {
    let counter = 0; 
    for (let x of names) {
    if (counter < 10) {
        if (x.toLowerCase().includes(search.toLowerCase())) {
        
        element("search-results").innerHTML +=
            "<div class='search-item' onclick='displayData(\"" +
            x +
            "\")'><p>" +
            x +
            "</p></div>";

        counter++;
        }
    }
    if (x.toLowerCase().includes(search.toLowerCase()))
       
        allSearchData += "<p>" + x + "</p>";
    }
    displaySearchResults();
}
}

function displaySearchResults() {
element("search-results").style.display = "block";
}

function clearSearchResults() {
element("search-results").innerHTML = "";
}

function hideSearchResults() {
element("search-results").style.display = "none";
}
function displayData(name) {
element("search-data").innerHTML = "<p>" + name + "</p>";
hideSearchResults();
}
function displayAllData(names) {
element("search-data").innerHTML = names;
hideSearchResults();
}
function clearSearchData() {
element("search-data").innerHTML = "";
}

element("search-input").oninput = function() {
getResults();
};

element("search-input").addEventListener("keyup", function(event) {

if (event.keyCode === 13) {
    
    event.preventDefault();
    
    displayAllData(allSearchData);
}
});