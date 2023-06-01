import React, { useState, useEffect } from "react";


function PastProjects(props){
  
  const [data, setData] = useState([]);
  
    const url = `/getalldocuments/${props.user}`;
    const tempData = [
      {
          "_id": "6472390fdbeb9b56b2f98835",
          "schemaSchema": "[{\"name\":\"GoblinGang\",\"type\":\"String\",\"require\":false}]",
          "title": "Goblin Schema1"
      },
      {
          "_id": "647240575ae09fd47062b9e3",
          "title": "Goblin Schema 2",
          "schemaSchema": "new schema",
          "__v": 0
      },
      {
          "_id": "647240618ae16081a1f88e38",
          "title": "Goblin Schema",
          "schemaSchema": "new schema",
          "__v": 0
      }]
   
      
  console.log('retrieved data in past projects',data)
  const styles = {
    color:'blue', 
    display: "flex",
    height: 100,
    width: 300,
    boxShadow: "0 5px 5px 2px #cec7c759",
    border: "1px solid #ccc",
    borderRadius: 20
  }
  //1. you want to get the document id when they click on the link
  //2. make a fetch request based on the id
  //3. display the SchemaMaker
  const dataElements = data.map(item => {
    console.log('item', item);
    return (
    <li key={item._id}
    onClick = {()=> {
      props.updateState(JSON.parse(item.schemaSchema));
      props.schemaFunc.addName(item.title);
    }}
    > 
        {item.title}
     
    </li>
  )});
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                 'Content-type': 'application/json; charset=UTF-8',
              },
              mode: 'cors'
            });
            const result = await response.json();
            console.log('result in pastprojects', result);
            setData(result);
          } catch (error) {
            // console.error('Error fetching data:', error);
            console.log(error);
          };
        };
        console.log('data in pastprojects', data);
        fetchData();
        
      }, []);
    return ( <>
    <h2>Saved Schemas</h2>
    <div id="past-proj-container">
         
        <div className="data-container" >
          <ul className="list">
            {dataElements}
          </ul>
        </div>
    </div>
    </>
      );

}

export default PastProjects;