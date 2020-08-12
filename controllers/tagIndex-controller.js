const Article = require('../models/article');
const mongoose = require("mongoose");

const TagCountIndex = async(req, res, next) => {
    let responseArray;

    let politicsTagCount;
    try {
        politicsTagCount = await Article.find({tags: "politics"}).count();
        console.log(politicsTagCount);
    } catch (error) {
        
    }

    responseArray.push({ tagName: "politics", count: politicsTagCount });

    // クライアントサイドでは、tag count（アイコン）はprops.countで、tag titleとLink先のembded params(http://3000/api/articles/tags/:tagname)に渡すTagnameは、props.tagnameで行う。tagIndex objectを渡す。
//   const tagIndex = {
//     tagName: "politics", // =Article.find({tags: "xx"})
//     count: politicsTagCount, // tag count. this is show in pop counter in frontend
//   };

  res.json({ responseArray });
};

exports.TagCountIndex = TagCountIndex;
