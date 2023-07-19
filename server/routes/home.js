const express = require('express');

const formController = require('../controllers/formController');

const router = express.Router();

router.post('/', formController.createDocument, (req, res) => {
  return res.status(200).json(res.locals.newDocument);
});

router.delete('/', formController.deleteDocument, (req, res) => {
  return res.status(200).json(res.locals.result);
});

router.patch('/', formController.updateDocument, (req, res) => {
  return res.status(200).json(res.locals.updatedDoc);
});

router.get(
  '/getalldocuments/:id',
  formController.getAllDocuments,
  (req, res) => {
    console.log('all documents', res.locals.allDocuments);
    return res.status(200).send(res.locals.allDocuments);
  }
);

module.exports = router;
