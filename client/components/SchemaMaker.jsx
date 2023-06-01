import React, { useState } from 'react';
import SchemaRow from './SchemaRow.jsx';
import SchemaDisplay from './SchemaDisplay.jsx';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const SchemaMaker = ({ kvpArr, schemaFunc, currentDocument }) => {
  console.log(currentDocument.title, 'currentDocument');
  const { title } = currentDocument;
  console.log(title, typeof title);

  // State for modal
  const [modalIsOpen, setIsOpen] = useState(false);

  // modal functions
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div id="schemaMaker">
      <h2>Schema - {title}</h2>
      {kvpArr.map((ele, index) => (
        <SchemaRow
          schemaObj={ele}
          key={index}
          rowNum={index}
          updateKvpSchema={schemaFunc.updateKvpSchema}
        />
      ))}
      <div id="editRows">
        <button title="add row" onClick={schemaFunc.addRow}>
          +
        </button>
        <button title="minus row" onClick={schemaFunc.minusRow}>
          -
        </button>
      </div>
      <SchemaDisplay kvpArr={kvpArr} currentDocument={currentDocument} />
      <div id="schemaExporters">
        <button onClick={() => {
          schemaFunc.saveSchema();
          }}>CREATE</button>
          <button onClick={() => {
          schemaFunc.updateSchema();
          }}>UPDATE</button>
        <button id="delete" onClick={openModal}>DELETE</button>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Test 2 Modal' className='modal' overlayClassName='overlay'>

          <div id="confirm-delete">

            <h2>Are you sure you want to delete this schema?</h2>
            <div id="delete-btns">

              <button onClick={closeModal}>CANCEL</button>
              <button id="delete" onClick={() => {
              schemaFunc.deleteSchema();
              closeModal();
              }}>DELETE</button>

            </div>

          </div>

        </Modal>
        {/* <button onClick={schemaFunc.saveSchema}>SAVE</button>
        <button id="delete" onClick={schemaFunc.deleteSchema}>DELETE</button> */}
      </div>
    </div>
  );
};

export default SchemaMaker;
