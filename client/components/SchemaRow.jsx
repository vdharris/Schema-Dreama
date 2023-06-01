import React, { useEffect } from 'react';

const SchemaRow = ({ schemaObj, rowNum, updateKvpSchema }) => 
{
  // useEffect(() => {
  //   let clicked = false;
  //   const nameInField = document.querySelector(`#row${rowNum}`)
  //   nameInField.addEventListener('click', () => {
  //     if (!clicked) {
  //       nameInField.value.select();
  //       clicked = true;
  //     }
  //   })
  // }, [])
  return (
  <div className="schemaRow" id={`row${rowNum}`}>
    <input
      value={schemaObj.name}
      onFocus={(e) => e.target.select()}
      onChange={(e) => updateKvpSchema(rowNum, { name: e.target.value.split(' ').join('_') })}
    ></input>

    <div>
        <label htmlFor="typeSel">Object type: {' '}</label>
        <select
          value={schemaObj.type}
          className="typeSel"
          name="typeSel"
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
    
    </div>

      <div id="holdReq">
        <label htmlFor="req">Required: {' '}</label>
        <input
          className='require'
          name="req"
          type="checkbox"
          checked={schemaObj.require}
          onChange={(e) => updateKvpSchema(rowNum, { require: e.target.checked })}
        ></input>
      </div>

    <div>
      <div>
        <label htmlFor="minMax">Min/Max: </label>
        <select
        value={schemaObj.minmax.string}
        name="minMax"
        className="minmaxSel"
        onChange={(e) => updateKvpSchema(rowNum, { minmax: { ...schemaObj.minmax, string: e.target.value } })}
        >
          <option value="max">Max</option>
          <option value="min">Min</option>
          <option value="null">null</option>
        </select>
      </div>

      <div id="limit-container">
        <label htmlFor="limit">Limit: {` `} </label>
        <input
        value={schemaObj.minmax.value}
        id='limit-num'
        name="limit"
        type='number'
        onChange={(e) => updateKvpSchema(rowNum, { minmax: { ...schemaObj.minmax, value: e.target.value } })}
      ></input>
      </div>
    </div>

    <div>
      <div>
        <label htmlFor="default">Default: {' '}</label>
        <select
        value={schemaObj.default.value}
        name="default"
        onChange={(e) => updateKvpSchema(rowNum, { default: {...schemaObj.default, value: e.target.value }})}
        >
          <option value="default">default</option>
          <option value="null">null</option>
        </select>
      </div>

      <input
      placeholder={schemaObj.default.placeholder}
      type='text'
      onChange={(e) => updateKvpSchema(rowNum, { default: { ...schemaObj.default, placeholder: e.target.value } })}
    ></input>



    </div>

  </div>
);
  }

export default SchemaRow;
