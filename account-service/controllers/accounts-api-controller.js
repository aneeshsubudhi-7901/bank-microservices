const AccountDAO = require("../data-access/accounts-dao");

exports.getAccDetails = (req, res) => {
  const accNumber = req.params.accNumber;
  AccountDAO.getAccDet(accNumber)
    .then((result) => {
      if (!result) {
        throw new Error("Account doesn't exist");
      }
      res
        .status(200)
        .json({ data: result, message: "Success, getting account details" });
    })
    .catch((error) => {
      res.status(500).json({
        data: [],
        message: `Error, getting account details. ${error}`,
      });
    });
};

exports.doWithdraw = (req, res) => {
  AccountDAO.doWith(req.body.amount, req.params.accNumber)
    .then((result) => {
      if (!result) throw new Error("Balance below withdraw amount");
      res.status(200).json({
        data: { modifiedCount: result.modifiedCount },
        message: "Success, amount withdrawn",
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: `Error, withdraw unsuccessful. ${error}`,
      });
    });
};

exports.doDeposit = (req, res) => {
  AccountDAO.doDep(req.body.amount, req.params.accNumber)
    .then((result) => {
      res.status(200).json({
        data: { modifiedCount: result.modifiedCount },
        message: "Success, amount deposited",
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ data: null, message: `Error, deposit unsuccessful. ${error}` });
    });
};
