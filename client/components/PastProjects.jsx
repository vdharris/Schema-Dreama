import React, { useState, useEffect } from "react";
import {useContext} from 'react';

function PastProjects(props){
  
  const [data, setData] = useState([]);
  

  useContext
  
    const url = `/getalldocuments/${props.user}`;
   
      
  console.log('retrieved data in past projects',props.savedSchemas)
  const styles = {
    color:'blue', 
    display: "flex",
    height: 100,
    width: 500,
    boxShadow: "0 5px 5px 2px #cec7c759",
    border: "1px solid #ccc",
    borderRadius: 20
  }
  //1. you want to get the document id when they click on the link
  //2. make a fetch request based on the id
  //3. display the SchemaMaker
  const dataElements = props.savedSchemas.map(item => {
    console.log('item', item);
    return (
    <li key={item._id}
    onClick = {()=> {
      props.updateState(JSON.parse(item.schemaSchema));
      props.schemaFunc.addName(item.title);
      props.setCurrentDocument(item);
    }}
    > 
        {item.title}
     
    </li>
  )});
    useEffect(() => {
      props.schemaFunc.getSavedSchemas();
    }, []);
    return ( <>
    <h2>Saved Schemas</h2>
    <div style={styles}>
         
        <span className="data-container" >
          <ul className="list">
            {dataElements}
          </ul>
        </span>
    </div>
    </>
      );

}

export default PastProjects;