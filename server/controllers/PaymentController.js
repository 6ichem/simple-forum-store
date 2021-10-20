const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "pk_test_51JmZuRBgoDtJp3VwjC4boBuNPndzdMd3LzIu8owtUeezIyTwp0gFebGNCpTZroexeMnd3s23hLUP443zJpU30bPj00hapKSAfj"
);
const uuid = require("uuid");

router.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT ", product);
  console.log("PRICE ", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
