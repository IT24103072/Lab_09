router.get('/total-spent/:studentId', async (req, res) => {
  const result = await Order.aggregate([
    { $match: { student: new mongoose.Types.ObjectId(req.params.studentId) }},
    { $group: { _id: "$student", totalSpent: { $sum: "$totalPrice" }}}
  ]);

  res.json(result[0] || { totalSpent: 0 });
});