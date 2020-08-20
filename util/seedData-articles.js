


// //single insert template
// db.articles.insert({
//   wishlists: [],
//   categories: ["investment"],
//   tags: ["investment"],
//   author: ObjectId("5f198bcf56966f144fe6f966"),
//   title: "sample2",
//   content: "sample2",
//   address: "kiyomizudera",
//   location: { lat: 34.9948561, lng: 135.7850463 },
//   image: "uploads/images/a4d7c862-00bc-4cfb-9ff5-59c1d7033dc2.jpeg",
//   date_created: new Date(Date.now()).toString(),
//   price: Math.floor(Math.random() * (50000 - 287) + 287),
// });

// //Bulk insert template
// var bulk = db.articles.initializeUnorderedBulkOp();
// bulk.insert({ title: "article1", content: "content1" });
// bulk.insert({ title: "article2", content: "content2" });
// bulk.insert({ title: "article3", content: "content3" });
// bulk.execute();
