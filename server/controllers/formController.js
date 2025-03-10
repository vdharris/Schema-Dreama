const mongoose = require('mongoose');
const Form = require("../model/documentModel.js");
const User = require("../model/userModel.js")



const formController = {};
//PATCH request to update the schema form
// formController.updateDocument = async (req, res, next) => {
//   const { id, form } = req.body;
//   console.log('Req body:', req.body)
//   /*
//   sent from front end on patch req
//     title: currentDocument.title,
//     schemaSchema: JSON.stringify(kvpArr),
//     _id: currentDocument._id,
//     user: user,
//   */

//   try {
//     console.log('req in update', id, form);
//     const filter = { _id: id };
//     const target = { schemaSchema: form };

//     const result = await Form.findOneAndUpdate(filter, target, {
//       returnDocument: 'after',
//       returnNewDocument: true,
//     });
//     console.log('after updateDocument', result);
//     res.locals.updatedDoc = result;
//     next();
//   } catch (error) {
//     next({
//       log: 'error in the updateDocument middleware controller',
//       err: error,
//     });
//   }
// };

formController.updateDocument = async (req,res,next) => {
  // const {  id, form } = req.body;
  console.log('in create doc', req.body)
  const { title, schemaSchema, user, _id } = req.body

  //const newDoc = new Form({title: name})
  // const schemaSchema = "ddd";  

  try {
    console.log('in the try')
    // see if form already exists in db
    const dupForm = await Form.findOne({ _id });
    console.log(dupForm, 'dupForm');
    if (dupForm) {
      const updatedForm = await Form.findOneAndUpdate({ _id }, { $set: { title, schemaSchema } }, { new: true });
      res.locals.newDocument = updatedForm;
      console.log('in createDoc if', updatedForm);
      return next();
    } else {
      console.log('form not found')
      return next(err);
    }
  } catch (error) {
    next({
      log: 'error in the createDocument middleware controller',
      err: error,
    });
  }
}

//POST request to create the schema form
formController.createDocument = async (req, res, next) => {
  // const {  id, form } = req.body;
  console.log('in create doc', req.body)
  const { title, schemaSchema, user, _id } = req.body

  //const newDoc = new Form({title: name})
  // const schemaSchema = "ddd";  

  try {
    console.log('in the try')
    // see if form already exists in db
      const document = await Form.create({ title, schemaSchema });
      const userFound = await User.findOneAndUpdate({ _id: user }, { $push: { savedSchema: document._id } }, { new: true });
      console.log('in the callback createDoc')
      res.locals.newDocument = document;
      console.log(res.locals.newDocument, 'res.locals')
      console.log('userFound', userFound)
      return next();
  } catch (error) {
    next({
      log: 'error in the createDocument middleware controller',
      err: error,
    });
  }
};

//DElETE request to delete the schema form
formController.deleteDocument = async (req, res, next) => {
  // get id from body
  console.log('delete', req.body)
  const { _id } = req.body;

  // console.log('delete ID', _id);

  const myQuery = { _id: _id };
  // console.log('delete query', myQuery);
  //const myQuery = '647775a71ae512d33651c166' //hardcoding delete of this form objectID
  try {
    // query db and deleteOne document
    const result = await Form.deleteOne({ _id: myQuery });
    res.locals.result = result

    next();
  } catch (error) {
    next({
      log: 'error in the deleteDocument middleware controller',
      err: error,
    });
  }
};

//GET request returning all documents

formController.getAllDocuments = async (req, res, next) => {
  // Deconstruct data from request body
  // Process obtained data
  // console.log('req params for get all documents', req.params)
  try {
    // Interact with DB
    const targetUser = await User.findOne({ _id: req.params.id }).populate('savedSchema');
    // console.log('targetUser', targetUser);
    res.locals.allDocuments = targetUser.savedSchema;
    // Invoke next middleware
    return next();
  } catch (error) {
    next({
      log: 'error in the formController.getAllDocuments controller',
      err: error,
    });
  }
};

////GET request returning single document based on id

// formController.getOneDocument = async (req, res, next) => {
//   const { id } = req.params;

//   try {

//     const result = await Form.findOne({ _id: id })
//     res.locals.retrievedDocument = result
//     next()
//   } catch (error) {
//     return next({
//       log: 'error in the getOneDocument middleware controller',
//       err: error,
//     });
//   }
// };

// {"_id":{"$oid":"6472390fdbeb9b56b2f98835"},
// "schemaSchema": "sample schema",
// "title": "Goblin Schema"}

module.exports = formController;
