const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const querystring = require("querystring");
const fs = require("fs");

const Wishlist = require('../models/wishlist');
const wishlist = require("../models/wishlist");

const getWishlistById = (req, res, next) => {};

const createNewWishlist =  async(req, res, next) => {
    const {name} = req.body;

    const createdWishlist = new Wishlist({
        name: name,
        articles: []
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdWishlist.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        
    }

    res.status(201).json({wishlist: createdWishlist})

    
};



const updateExistingWishlist = async (req, res, next) => {
    
};

const deleteExistingWishlist = (req, res, next) => {
    
};


// const deleteExistingWishlist = (req, res, next) => {
//     const parsedQuery = querystring.parse(
//       "k=電子レンジ&i=kitchen&bbn=3895791&rh=n%3A3895791%2Cp_6%3AA1KRLX1KHKPKB4%7CA3DRS0GSB5UKDC%7CAN1VRQENFRJN5&dc&__mk_ja_JP=カタカナ&qid=1594334676&rnid=388333011&ref=sr_nr_p_6_10",null, null);
//     const parsedQuery2 = querystring.parse(
//       "k=冷蔵庫&i=kitchen&__mk_ja_JP=カタカナ&ref=nb_sb_noss_2",
//       null,
//       null
//     );
//     const keyword = parsedQuery.k;
//     const keywordMatchedItems = Item.find({ category: keyword });

//     res.json({ matchedItems: keywordMatchedItems.toObject({getters: true})})


//     let fd;
//     fd = fs.openSync("sample.txt", "a");
//     fs.appendFileSync(fd, "this is a pen this is a pen", 'utf8');
//     fs.closeSync(fd);
// };



const pushNewArticleToWishlist = async (req, res, next) => {
//   const articleId = req.params.articleId;

//   let foundArticle;
//   try {
//     foundArticle = await Article.findById(articleId);
//     wishlist.articles.push(foundArticle);
//   } catch (err) {}

//   let foundWishlist;
//   try {
//       foundWishlist = await Wishlist.findOne("5f060aa95c8f750c0eb55264")
//   } catch (err) {
      
//   }

//   foundWishlist.articles.push(foundArticle);

//   res.status(201).json({ wishlist: foundWishlist });
};

exports.getWishlistById = getWishlistById;
exports.createNewWishlist = createNewWishlist;
exports.updateExistingWishlist = updateExistingWishlist;
exports.deleteExistingWishlist = deleteExistingWishlist;
exports.pushNewArticleToWishlist = pushNewArticleToWishlist;
