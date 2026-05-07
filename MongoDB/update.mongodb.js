use("ecommerce");

//updateone
// db.products.updateOne(
// { name: "Wireless Mouse" },//selector
// { $set: { price: 899 } }//new one that we have to set
// )

//update many
// db.products.updateMany(
// { category: "Electronics" },
// { $inc: { stock: 10 } }
// )//it will increment the stock by 10 whose category is electronics

//Using $push to Add to Arrays
db.products.updateOne(
{ name: "Wireless Mouse" },
{ $push: { tags: "newtag" } }
)
