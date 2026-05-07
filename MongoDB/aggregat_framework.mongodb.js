use("ecommerce");
db.orders.aggregate([
{ $group: { _id: null, totalRevenue: { $sum: "$total" } } }
])

