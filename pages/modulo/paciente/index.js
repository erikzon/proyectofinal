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
  WindowContent,
  Button,
  Select,
  NumberField,
  Progress,
  Checkbox,
} from "react95";

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
  let { recordset } = await request.query("select nombre, domicilio, IdFiscal from cliente where activo = 1");
  let jsonParaEnviar = JSON.stringify(recordset);
  console.log(JSON.stringify(recordset));

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
          <WindowContent>
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
                  {/* {recordset.map((record,index) => {
                    <TableRow key={index}>
                      <TableDataCell>{record[index]}</TableDataCell>
                    </TableRow>;
                  })} */}
                  {/* <TableDataCell>{recordset.length}</TableDataCell>
                  <TableDataCell>que chingas</TableDataCell>
                  <TableDataCell>que chingas</TableDataCell> */}

                {recordset.map((record, index) => (
                  <TableRow key={index}>
                    {Object.values(recordset[index]).map(
                      (paciente, otroIndex) => (
                        <TableDataCell key={otroIndex}>
                          {paciente}
                        </TableDataCell>
                      )
                    )}
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </WindowContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 8,
              marginTop: 8,
              alignItems: "flex-end",
            }}
          >
            <Select
              style={{ marginLeft: 8 }}
              value={1}
              onChange={() => {}}
              options={opt}
              defaultValue={"10"}
            ></Select>
            <span style={{ marginLeft: 8 }}>
              Page <strong>3 of 10</strong>
              <span style={{ marginLeft: 8 }}>
                Go to page:
                <NumberField
                  style={{ marginLeft: 8 }}
                  min={1}
                  defaultValue={1}
                  width={130}
                  onChange={(value) => {
                    1;
                    setPageIndex(page);
                  }}
                />
              </span>
            </span>
          </div>
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
