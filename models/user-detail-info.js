const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetailInfoSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  address: [
    {
      country: "",
      zip_code: "",
      todoufuken: "",
      shichousonku: "",
      banchi: "",
      name_of_residence: "",
    },
  ],
  phone_numbers: [
    {
      phone_number: "11111111111",
    },
    {
      phone_number: "22222222222",
    },
  ],
  //   default_payment_method: "creditCard2",
  //   optional_payment_method: ["creditCard1", "bank1"
  //   ]
});
    // { type: "credit_card",
    //   card_type: "visa",
    //   card_name: "aaaaaaaaa",
    //   card_number: "11111111111",
    //   expiration_date: ISODate("01-25-1896"),
    // },
    // {
    //     type: "bank",
    //     account_number: "",
    //     branch_code: ""
    // }