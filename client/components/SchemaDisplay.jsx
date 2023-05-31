import React from 'react';

const SchemaDisplay = ({ kvpArr, currentDocument }) => {
  // console.log('-----------------', kvpArr)
  
  let schemaArr = [`const ${currentDocument.title} = new Schema ({ `];
  for (const ele of kvpArr) {


    const tempLine = 
      `       ${ele.name}: { type: ${ele.type}, require: ${ele.require ? 'true' : 'false'} ${ele.minmax.string!='null' ? `, ${ele.minmax.string} : ${ele.minmax.value}` : ``}  ${ele.default.value!=`null` ? `, ${ele.default.value}: ${ele.default.placeholder}` : ``} },
      ` 

    
     ;




    schemaArr.push(tempLine);
  }
  schemaArr.push('});');
  console.log('schemaArr', schemaArr)
  const schemaStr = schemaArr.join('\n');
  return (
    <pre>
      <code>{schemaStr}</code>
    </pre>
  );
};

export default SchemaDisplay;

