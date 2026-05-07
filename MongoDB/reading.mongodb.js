use("ecommerce");

// db.products.find();//all products
// db.products.find({"name":"Gaming Laptop"});//get products by name
// db.products.find({category:"Electronics"});//get products by category

//1. Using Comparison Operators

// db.products.find({ price: { $gt: 1000 } })
// db.products.find({ price: { $gte: 1000, $lte: 50000 } })

//2.Logical Operators
// db.products.find({ $and: [{ category: "Electronics" }, { stock: { $lte: 80 } }] })

// db.products.find({ $or: [{ category: "Electronics" }, { stock: { $lt: 50 } }] })

//3.projection
// db.products.find({}, { name: 1, price: 1, _id: 0 })//it will show all name and price of products

//4.Sorting and Limiting

//sort
// db.products.find().sort({ price: 1 })//sort price in ascending
// db.products.find().sort({ price: -1 })//sort price in descending

//limit
// db.products.find().limit(2)//show the products with limit 2 from start

//skip
// db.products.find().skip(2)//it will skip 2 products from start

// db.products.find().sort({ price: -1 }).limit(2)//show products in descending with limit

db.products.find().skip(1).limit(2)//it will skip 1 and show the two next data



