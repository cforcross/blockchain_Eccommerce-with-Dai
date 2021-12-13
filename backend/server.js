const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
// const bodyParser = require("koa-bodyparser");
const ethers = require("ethers");
const PaymentProcessor = require("../frontend/src/contracts/PaymentProcessor.json");
const { Payment } = require("./db.js");

const app = new Koa();
const router = new Router();
const items = {
  1: { id: 1, url: "https://urlTodownlad1" },
  2: { id: 1, url: "https://urlTodownlad1" },
};

router.get("/api/getPaymentId/:itemId", async (ctx) => {
  const paymntId = (Math.random() * 10000).toFixed(0);
  await Payment.create({
    id: paymntId,
    itemId: ctx.params.itemId,
    paid: false,
  });
  ctx.body = {
    paymentId: paymntId,
  };
});

// router.get("/api/getItemUrl/:paymentId", async (ctx) => {
//   const payment = await Payment.findOne({
//    if (payment && payment.paid === true) {
//       ctx.body = {
//         url: items[payment.itemId].url,
//       };
//     } else {
//         ctx.body = {
//             url: "",
//         };
//         }
//     });
//     });
//     }

//    }
//   });
//   ctx.body = {
//     itemUrl: payment.itemUrl,
//   };
// });

router.get("/api/getItemUrl/:paymentId", async (ctx) => {
  const payment = await Payment.findOne({
    where: {
      id: ctx.params.paymentId,
    },
  });
  if (payment && payment.paid === true) {
    ctx.body = {
      url: items[payment.itemId].url,
    };
  } else {
    ctx.body = {
      url: "",
    };
  }
});

app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

const listenToEvents = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const networkId = "5777";
  const paymentProcessor = new ethers.Contract(
    PaymentProcessor.networks[networkId].address,
    PaymentProcessor.abi,
    provider
  );
  paymentProcessor.on("PaymentDone", async (payer, amount, paymentId, date) => {
    console.log(`
        from: ${payer} --
        amount ${amount}-- paymentId -- ${paymentId}  date ${new Date(
      date.toNumber() * 1000
    ).toLocalString()}`);
    const payment = await Payment.findOne({ id: paymentId });
    if (payment) {
      payment.paid = true;
      await payment.save();
    }
  });
};
listenToEvents();
