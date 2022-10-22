const sql = require("mssql/msnodesqlv8");
var config = {
  database: "BDTAREA",
  server: "ERICK-LAPTO\\SQLEXPRESS",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

sql.connect(config, function (err) {
  if (err) {
    console.log(err);
  }
});

export default function handler(req, res) {
  var request = new sql.Request();
  request.query("select * from cliente", function (err, recordSet) {
    if (err) {
      console.log(err);
    } else {
      console.log(recordSet);
    }
  });
  res.status(200).json({ name: "John Doe" });
}
