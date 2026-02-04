const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  const { amount, category, description, date, clientRequestId } = req.body;

  if (
    amount === undefined ||
    amount < 0 ||
    !category ||
    !date ||
    !clientRequestId
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const existingExpense = await Expense.findOne({ clientRequestId });
  if (existingExpense) {
    return res.status(200).json(existingExpense);
  }

  const expense = await Expense.create({
    amount,
    category,
    description,
    date,
    clientRequestId,
  });

  return res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
  const { category, sort } = req.query;

  const query = {};
  if (category) query.category = category;

  let expensesQuery = Expense.find(query);

  if (sort === "date_desc") {
    expensesQuery = expensesQuery.sort({
      date: -1,
      createdAt: -1,
    });
  }

  const expenses = await expensesQuery;

  const result = expenses.map((e) => ({
    id: e._id,
    amount: e.amount,
    category: e.category,
    description: e.description,
    date: e.date,
    created_at: e.createdAt,
  }));

  return res.json(result);
};
