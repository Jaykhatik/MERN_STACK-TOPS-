use("ecommerce");


//$match and $project

// db.sales.aggregate([
//   { $match: { category: "Fruit" } }, //here in 1st stge we find the sales which category is fruit
//   {
//     $project: {
//       _id: 0,
//       item: 1,
//       quantity: 1,
//     },
//   },//here in stage two from the output of stage 1 which shows the 3 products of fruits now in stag 2 we display only item and quantity
// ]);



//$group:-Group and calculate totals
// db.sales.aggregate([
// {
//  $group: {
//  _id: "$category",
//  totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
// }
// }
// ]);


//$sort
// db.sales.aggregate([
// {
//  $group: {
//  _id: "$category",
//  totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
// }
// },
// { $sort: { totalSales: -1 } }
// ]);

//$match + $group

db.sales.aggregate([
{ $match: { category: "Fruit" } },
{
 $group: {
 _id: null,
 totalFruitSales: { $sum: { $multiply: ["$price", "$quantity"] } }
}
}
]);

