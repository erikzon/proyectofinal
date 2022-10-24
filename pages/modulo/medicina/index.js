import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Window,
  WindowHeader,
  TextField,
  Button,
} from "react95";

export async function getServerSideProps(context) {
  const sql = require("mssql/msnodesqlv8");
  var config = {
    database: "BD_Project",
    server: "ERICK-LAPTO\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  };

  sql.connect(config);
  var request = new sql.Request();
  let { recordset } = await request.query("exec readMedicina");
  console.log(recordset);
  return {
    props: { recordset },
  };
}

export default function Medicina({ recordset }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
          backgroundColor: "rgb(0, 128, 128)",
        }}
      >
        <Window style={{ width: "95%" }}>
          <WindowHeader>Medicina</WindowHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 8,
              marginTop: 8,
              alignItems: "flex-end",
              gap: "6rem",
            }}
          >
            <Button type="submit" value="login">
              Crear
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(recordset[0]).map((cabecera, index) => (
                  <TableHeadCell key={index}> {cabecera} </TableHeadCell>
                ))}
                <TableHeadCell> Accion </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordset.map((record) => (
                <TableRow key={record.ID_Medicina}>
                  <TableDataCell>{record.ID_Medicina}</TableDataCell>
                  <TableDataCell>{record.Nombre}</TableDataCell>
                  <TableDataCell>{record.Perecedero ? "X" : ""}</TableDataCell>
                  <TableDataCell>{record.Fecha_Ingreso}</TableDataCell>
                  <TableDataCell>{record.Fecha_Lote}</TableDataCell>
                  <TableDataCell>{record.Fecha_Caducidad}</TableDataCell>
                  <TableDataCell>{record.Casa}</TableDataCell>
                  <TableDataCell>{record.TipoMedicamento}</TableDataCell>
                  <TableDataCell>
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Window>
      </div>
    </>
  );
}
