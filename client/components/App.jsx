import React, { Component, useState, useEffect } from 'react';

import PastProjects from './PastProjects.jsx';
import SchemaMaker from './SchemaMaker.jsx';
import { Router, Route, Redirect, Routes } from 'react-router-dom';
import Login from './Authentication /Login.jsx';
import SignUp from './Authentication /SignUp.jsx';
import InputButton from './InputButton.jsx';


function App() {
  //State for Key-Value Pairs
  const [kvpArr, setKvp] = useState([
    { name: '🔥👀😈🐣', 
    type: 'string', 
    require: false, 
    minmax: {
      string: "min",
      value: '0'
    },
    default:{
      value: 'default',
      placeholder: 'placeholder',
    }
   },
  ]);
  const [currentDocument, setCurrentDocument] = useState({
    title: 'schema1',
    schemaSchema: 'temp',
  });

  //state for login
  const [loggedIn, setLoggedIn] = useState(false);

  //state for signup
  // const [signedUp, setSignedUp] = useState(false);

  //State for Past Projects
  const [savedSchemas, setSavedSchemas] = useState([]);

  //State for user object
  const [user, setUser] = useState({});

  //functions to drill down

  // const userObject = (userObject) => {
  //   return setUser(userObject);
  // };

  const handleLogOut = () => {
    setUser({});
    setLoggedIn(false);
  };

  const schemaFunc = {};
  // updateKvpSchema actually changes the state each time, and then all the other f(n)s invoke it.
  schemaFunc.addName = function (input) {
    setCurrentDocument((prev) => {
      return { ...prev, title: input };
    });
  };
  schemaFunc.updateKvpSchema = (rowNum, changeObj) => {
    const newState = structuredClone(kvpArr);
    Object.assign(newState[rowNum], changeObj);
    setKvp(newState);
  };

  //TODO: FETCH ID TO DELETE ON LINE 33
  schemaFunc.deleteSchema = () => {
    fetch('/', {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(currentDocument),
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          console.log('data.deleted');
          setCurrentDocument({
            title: 'temp',
            schemaSchema: 'temp',
          });
          schemaFunc.clearSchema();
        }
      }).then(() => schemaFunc.getSavedSchemas())
      .catch((err) => console.log(err));
  };
  schemaFunc.addRow = () => {
    const newState = structuredClone(kvpArr);
    newState.push({ 
      name: `key${kvpArr.length + 1}`,
      type: 'string', 
      require: false, 
      minmax: {
      string: "min",
      value: '0'
    },
    default:{
      value: `default`,
      placeholder: '',
    }
     });
    setKvp(newState);
  };

  schemaFunc.minusRow = () => {
    const newState = structuredClone(kvpArr);
    if (newState.length > 1) newState.pop();
    setKvp(newState);
  };

  schemaFunc.saveSchema = () => {
    fetch('/', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: currentDocument.title,
        schemaSchema: JSON.stringify(kvpArr),
        _id: currentDocument._id,
        user: user,
        //user: user want current logged in user
      }),
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data in saved schemas', data.schemaSchema);
        setCurrentDocument(data);
        setKvp(JSON.parse(data.schemaSchema));
      }).then(() => schemaFunc.getSavedSchemas())
      .catch((err) => console.log(err));
  };

  schemaFunc.clearSchema = () => {
    setKvp([{ 
      name: 'Write something', 
      type: 'String', 
      require: false, 
     minmax: {
      string: "min",
      value: '0'
    },default:{
      value: `default`,
      placeholder: '',
    }

    }]);
  };

  schemaFunc.getSavedSchemas = async () => {
    try {
      const response = await fetch(`/getalldocuments/${user}`, {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000/',
           'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors'
      });
      const result = await response.json();
      console.log('result in pastprojects', result);
      setSavedSchemas(result);
    } catch (error) {
      // console.error('Error fetching data:', error);
      console.log(error);
    };
  };

  useEffect(() => {
    setCurrentDocument({
      ...currentDocument,
      title: `schema${savedSchemas.length + 1}`
    })
  }, [savedSchemas]);

  return (
    <div id="appBox">
      <Routes>
        <Route
          exact
          path="/"
          element={
            loggedIn ? (
              <>
                <h1 id="app-title"><div className='h1Holder'>SCHEAMA DREAMA</div></h1>
                <div>
                  <img className="menu-bg" src={user.picture}></img>

                  {/* <button className="button" onClick={() => setLoggedIn(false)}>
                    Log Out
                  </button> */}

                  <h3>{user.name}</h3>
                </div>

                <button onClick={handleLogOut}>Log Out</button>

                {/* <span> */}
                  <InputButton schemaFunc={schemaFunc} />
                {/* </span> */}
                <SchemaMaker
                  kvpArr={kvpArr}
                  schemaFunc={schemaFunc}
                  currentDocument={currentDocument}
                />
                <div id="past-projs">
                  {' '}
                  <PastProjects savedSchemas={savedSchemas} schemaFunc={schemaFunc} updateState={setKvp} setCurrentDocument={setCurrentDocument} user={user} />{' '}
                </div>
              </>
            ) : (
              <>
                <Login
                  setLoggedIn={setLoggedIn}
                  setUser={setUser}
                />
              </>
            )
          }
        />
        {/* {loggedIn ? < />: <SignUp/ >} */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/schemamaker" element={<SignUp />} /> */}
      </Routes>

      {/* if logged in is successful, reroute to the rest of the components; otherwise, reroute to login page  */}
    </div>
  );
}

export default App;
