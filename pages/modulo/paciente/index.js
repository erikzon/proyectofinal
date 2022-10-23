import { useMemo, useRef, useState } from "react";
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
  Select,
  NumberField,
  Progress,
  Checkbox,
} from "react95";
import { Link } from "next/link";

export async function getServerSideProps(context) {
  const sql = require("mssql/msnodesqlv8");
  var config = {
    database: "BDTAREA",
    server: "ERICK-LAPTO\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  };

  sql.connect(config);
  var request = new sql.Request();
  let { recordset } = await request.query(
    "select nombre, domicilio, IdFiscal from cliente where activo = 1"
  );
  console.log(recordset);
  return {
    props: { recordset },
  };
}

export default function paciente({ recordset }) {
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
          <WindowHeader>Pacientes</WindowHeader>
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
            <TextField
              fullWidth
              type="text"
              placeholder="ingrese un nombre o id"
              onChange={(e) => {
                setcontrasena(e.target.value);
              }}
            />
            <Button type="submit" value="login">
              Buscar
            </Button>
            <Button type="submit" value="login">
              Crear
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(recordset[0])
                  .reverse()
                  .map((cabecera, index) => (
                    <TableHeadCell key={index}> {cabecera} </TableHeadCell>
                  ))}
                <TableHeadCell> Accion </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordset.map((record) => (
                <TableRow key={record.IdFiscal}>
                  <TableDataCell>{record.IdFiscal}</TableDataCell>
                  <TableDataCell>{record.domicilio}</TableDataCell>
                  <TableDataCell>{record.nombre}</TableDataCell>
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
export const opt = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
];
