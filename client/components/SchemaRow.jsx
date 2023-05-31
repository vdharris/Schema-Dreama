import React from 'react';

const SchemaRow = ({ schemaObj, rowNum, updateKvpSchema }) => (
  <div className="schemaRow">
    <input
      value={schemaObj.name}
      onChange={(e) => updateKvpSchema(rowNum, { name: e.target.value })}
    ></input>

    <div>
      Object type: {' '}
      <select
        value={schemaObj.type}
        className="typeSel"
        onChange={(e) => updateKvpSchema(rowNum, { type: e.target.value })}
      >
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="boolean">Boolean</option>
        <option value="array">array</option>
        <option value="object">Object</option>
        <option value="buffer">Buffer</option>
        <option value="mix">Mixed</option>
        <option value="objectId">ObjectId</option>
        <option value="schematypesobjectid">Schema.Types.ObjectId</option>
      </select>
   

  
      Required: {' '}
    <input
      className='require'
      type="checkbox"
      checked={schemaObj.require}
      onChange={(e) => updateKvpSchema(rowNum, { require: e.target.checked })}
    ></input>
    </div>

    <div>
      Min/Max:
      <select
      value={schemaObj.minmax.string}
      className="minmaxSel"
      onChange={(e) => updateKvpSchema(rowNum, { minmax: { ...schemaObj.minmax, string: e.target.value } })}
      >
        <option value="max">Max</option>
        <option value="min">Min</option>
        <option value="null">null</option>
      </select>

      Limit: {` `}
     
      <input
      value={schemaObj.minmax.value}
      type='number'
      onChange={(e) => updateKvpSchema(rowNum, { minmax: { ...schemaObj.minmax, value: e.target.value } })}
    ></input>
    </div>

    <div>
      Default: {' '}
      
      <select
      value={schemaObj.default.value}
      onChange={(e) => updateKvpSchema(rowNum, { default: {...schemaObj.default, value: e.target.value }})}
      >
        <option value="default">default</option>
        <option value="null">null</option>
      </select>

      <input
      value={schemaObj.default.placeholder}
      type='text'
      onChange={(e) => updateKvpSchema(rowNum, { default: { ...schemaObj.default, placeholder: e.target.value } })}
    ></input>



    </div>

  </div>
);

export default SchemaRow;
