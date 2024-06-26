const crypto = require("crypto");

module.exports = {
  path: "",
  method: "GET",
  Auth: false,
  run: async (req, res, mongo_client) => {
    const check = req.query.check;
    if (check) {
      const decimal = parseInt(check.slice(-1), 16);
      const result = (decimal % 2) + 1;

      res.status(200).json({
        status: "success",
        result: result,
      });
    }

    const id1 = req.query.a || "0";
    const id2 = req.query.b || "0";
    const random_secret = crypto.randomBytes(16).toString("hex");
    const string = `${id1}|${id2}|${random_secret}`;
    const hash = crypto.createHash("sha256").update(string).digest("hex");
    const decimal = parseInt(hash.slice(-1), 16);
    const result = (decimal % 2) + 1;

    res.status(200).json({
      status: "success",
      server_seed: random_secret,
      client_seed: `${id1}|${id2}`,
      hash: hash,
      result: result,
    });
  },
};