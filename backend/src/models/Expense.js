const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,        
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    clientRequestId: {
      type: String,
      required: true,
      unique: true,       
    },
  },
  {
    timestamps: true,    
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
