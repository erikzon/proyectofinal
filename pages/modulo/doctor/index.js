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

import { useRouter } from "next/router";
import { useRef, useState } from "react";

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
  let { recordset } = await request.query("exec readDoctor");
  console.log(recordset);
  return {
    props: { recordset },
  };
}

export default function Doctor({ recordset }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [usarBusqueda, setUsarBusqueda] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);

  const activardesactivar = (usuario, activoinactivo) => {
    const peticion = fetch(
      `http://localhost:3000/api/doctor?usuario=${usuario}&activoinactivo=${
        activoinactivo ? "1" : "0"
      }`,
      { method: "DELETE" }
    );
    peticion
      .then((response) => response.json())
      .then((datos) => {
        refreshData();
        setUsarBusqueda(false);
      })
      .catch((e) => console.log(e));
  };

  const enviarFormularioDoctor = () => {
    const peticion = fetch(
      `http://localhost:3000/api/doctor?usuario=${nombreRef.current.value}&apellido=${apellidoRef.current.value}&colegiado=${colegiadoRef.current.value}`,
      { method: "POST" }
    );
    peticion
      .then((response) => response.json())
      .then((datos) => {
        refreshData();
        setUsarBusqueda(false);
        setModalCrear(false);
      })
      .catch((e) => console.log(e));
  };

  const nombreRef = useRef(" ");
  const apellidoRef = useRef(" ");
  const colegiadoRef = useRef(" ");

  const editar = (record) => {
    setModalCrear(true);
    setTimeout(() => {
      nombreRef.current.value = record.Nombre;
      apellidoRef.current.value = record.Apellido;
      colegiadoRef.current.value = record.Descripcion;
    }, 200);
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
          <WindowHeader>Doctores</WindowHeader>
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
              {modalCrear ? "Cancelar" : "crear"}
            </Button>
          </div>
          {modalCrear && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(usuario, contrasena);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "flex-start",
                  gap: "1rem",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  padding: "1rem",
                }}
              >
                <section>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    nombre
                    <TextField fullWidth ref={nombreRef} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    Apellido
                    <TextField fullWidth type="text" ref={apellidoRef} />
                  </div>
                </section>
                <section>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    colegiado
                    <TextField fullWidth type="text" ref={colegiadoRef} />
                  </div>
                </section>
                <Button type="button" onClick={() => enviarFormularioDoctor()}>
                  Crear
                </Button>
              </div>
            </form>
          )}
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
                <TableRow key={record.ID}>
                  <TableDataCell>{record.Nombre}</TableDataCell>
                  <TableDataCell>{record.Apellido}</TableDataCell>
                  <TableDataCell>{record.Colegiado}</TableDataCell>
                  <TableDataCell>{record.Disponible ? "X" : ""}</TableDataCell>
                  <TableDataCell>{record.Descripcion}</TableDataCell>
                  <TableDataCell>
                    <Button onClick={() => editar(record)}>Editar</Button>
                    <Button
                      onClick={() =>
                        activardesactivar(record.Apellido, !record.Disponible)
                      }
                    >
                      {record.Disponible ? "desactivar" : "activar"}
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
