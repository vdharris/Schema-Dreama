import React, { Component, useState } from 'react';
import SchemaMaker from './SchemaMaker.jsx';

function App() {
  //State for Key-Value Pairs
  const [kvpArr, setKvp] = useState([
    { name: '', type: 'Number', require: false },
  ]);
  //State for Past Projects

  //functions to drill down

  const schemaFunc = {};
  // updateKvpSchema actually changes the state each time, and then all the other f(n)s invoke it.
  schemaFunc.updateKvpSchema = (rowNum, changeObj) => {
    const newState = structuredClone(kvpArr);
    Object.assign(newState[rowNum], changeObj);
    setKvp(newState);
  };

  schemaFunc.addRow = () => {
    const newState = structuredClone(kvpArr);
    newState.push({ name: '', type: 'string', require: false });
    setKvp(newState);
  };

  schemaFunc.saveSchema = () => {
    fetch('localhost:3000', {
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000/' },
      body: { id: 'HARD CODE ME HERE', form: JSON.stringify(kvpArr) },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Schema Dreama</h1>
      <div>InputButton</div>
      <div>PastProjects</div>
      <SchemaMaker kvpArr={kvpArr} schemaFunc={schemaFunc} />
    </div>
  );
}

export default App;
