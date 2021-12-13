const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:Nun5bmvhamvEoKE9@cluster0.1rlhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
// Nun5bmvhamvEoKE9
const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
  Payment,
};
