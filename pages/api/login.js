const sql = require("mssql/msnodesqlv8");
var config = {
  database: "BD_Project",
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

export default async function handler(req, res) {
  var request = new sql.Request();
  if (req.method === "GET") {
    await request.query(
      `select 1 as respuesta from usuario where Usuario = '${req.query.usuario}' and Contrasena = '${req.query.contrasena}' and ActivoInactivo = 1`,
      function (err, recordSet) {
        if (err) {
          res.status(400).json({ respuesta: 0 });
        } else {
          res
            .status(200)
            .json({ respuesta: recordSet.recordset[0]?.respuesta ?? 0 });
        }
      }
    );
  } else {
    res.status(200).json({ 'respuesta': 'en desarrollo'});
  }
}
