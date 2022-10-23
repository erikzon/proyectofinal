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
  Modal,
  Fieldset,
} from "react95";
import { useRouter } from "next/router";
import { useState } from "react";
import Crear from "../../../components/Crear";

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
  let { recordset } = await request.query("exec readusuario");
  console.log(recordset);
  return {
    props: { recordset },
  };
}

export default function Usuarios({ recordset }) {
  const [modalCrear, setModalCrear] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const activardesactivar = (usuario, activoinactivo) => {
    const peticion = fetch(
      `http://localhost:3000/api/usuarios?usuario=${usuario}&activoinactivo=${
        activoinactivo ? "1" : "0"
      }`,
      { method: "DELETE" }
    );
    peticion
      .then((response) => response.json())
      .then((datos) => {
        refreshData();
      })
      .catch((e) => console.log(e));
  };
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
          <WindowHeader>Usuarios</WindowHeader>
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
            <Button type="button" onClick={() => setModalCrear(!modalCrear)}>
              {modalCrear ? "Cancelar crear" : "crear"}
            </Button>
          </div>
          {modalCrear && <Crear />}
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
                <TableRow key={record.Usuario}>
                  <TableDataCell>{record.Usuario}</TableDataCell>
                  <TableDataCell>{record.Constraseña}</TableDataCell>
                  <TableDataCell>
                    {record.ActivoInactivo ? "activo" : "inactivo"}
                  </TableDataCell>
                  <TableDataCell>{record.FK_ID_TipoUsuario}</TableDataCell>
                  <TableDataCell>{record.DPI}</TableDataCell>
                  <TableDataCell>
                    <Button>Editar</Button>
                    <Button
                      onClick={() =>
                        activardesactivar(
                          record.Usuario,
                          !record.ActivoInactivo
                        )
                      }
                    >
                      {record.ActivoInactivo ? "desactivar" : "activar"}
                    </Button>
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
