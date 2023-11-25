// modules required for routing
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../config/db');
const router = express.Router();
const Transaction = require('../models/transactions');
let User = require('../models/user');



function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, DB.Secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

/* GET incidents List page. READ */
// router.get('/', (req, res, next) => {
//   // find all incidents in the incidents collection
//   Transaction.find((err, transactions) => {
//     if (err) {
//       return console.error(err);
//     }
//     else {
//       res.json(transactions);
//     }
//   });

// });

// GET the Incident Details page in order to edit an existing Incident
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Transaction.findById(id, (err, transactionToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(transactionToEdit);
    }
  });
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/newTransaction', requireAuth, async (req, res, next) => {
  //let currentDate = new Date();
  //let transactionDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear().toString().substr(-2)}`;
  console.log(req.body);
  // let lastTransaction = await Transaction.findOne().sort({ $natural: -1 }).exec();
  // let lastTransactionNumber = lastTransaction ? await Transaction.countDocuments() : 0;


  // Increment the last incident number and pad with leading zeros
  //let newTransactionNumber = (lastTransactionNumber + 1).toString().padStart(7, '0');

  let newTransaction = new Transaction({
    "id": req.body._id,
    "category": req.body.category,
    "subcategory": req.body.subcategory,
    "quantity": req.body.quantity,
    "amount": req.body.amount,
    "description": req.body.description,
    "status": req.body.status,
    "date": req.body.date
  });

  try {
    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();
  
    // Find the user by ID
    const user = await User.findById(req.user.id);
  
    // Add the transaction ID to the user's transactions array
    user.transactions.push(savedTransaction); // Assuming transactions is an array of transaction IDs
  
    // Save the updated user object
    const updatedUser = await user.save();
  
    console.log('Transaction added to user:', savedTransaction);
    console.log('Updated User:', updatedUser);
return res.status(200).json({success:true, message:"Transaction added successfully"})

  } catch (error) {
    console.error('Error adding transaction to user:', error);

    return res.status(500).json({success:false, message:"Transaction added successfully"})
  }



// try{
//   await AddTransactionToUSer.save();
//   console.log(AddTransactionToUSer);
// }
// catch(err){
//   console.log(err);
//   res.status(500).json({error:'An error occured while fetching transaction'});
// }

  // Transaction.create(newTransaction, (err, transaction) => {
  //   if (err) {
  //     console.log(err);
  //     res.end(err);
  //   }
  //   else {
  //     res.json(transaction);
  //   }
  // });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Transaction.findById(id, (err, transaction) => {
    if (err) {
      console.log(err);
      res.end(err);
    }

    let updatedTransaction = Transaction({
        "category": req.body.category,
        "subcategory": req.body.subcategory,
        "quantity": req.body.quantity,
        "amount": req.body.amount,
        "description": req.body.description,
        "status": req.body.status,
        "date": req.body.date
    });

    if (transaction.Status != updatedTransaction.Status) {
      const narrative = req.body.Narrative;
      const log = {
        User: req.user.displayName,
        From: transaction.Status,
        To: updatedTransaction.Status,
        Narrative: narrative,
        Date: new Date(),
      };
      let logHistory = transaction.LogHistory || [];
      logHistory.push(log);
      updatedTransaction.LogHistory = logHistory;

      if (updatedTransaction.Status == "Close") {
        updatedTransaction.ResolutionMessage = narrative;
      }
    }

    Transaction.updateOne({ _id: id }, updatedTransaction, {}, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.json(updatedTransaction);
      }
    });
  });
});

// GET - process the delete by user id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Transaction.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(id);
    }
  });
});


module.exports = router;
