import Router from "next/router";
import { useState, useEffect } from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";

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
  let { recordset } = await request.query(
    `select ModuloPaciente,ModuloDoctor,ModuloMedicina,ModuloReporte from tipo_usuario 
	inner join usuario on tipo_usuario.ID_TipoUsuario = usuario.FK_ID_TipoUsuario
	where usuario.usuario = '${context.query.usuario}'`
  );
  console.log(recordset);
  return {
    props: { recordset },
  };
}

export default function Home({recordset}) {
  useEffect(() => {
    console.log(recordset[0].ModuloDoctor);
  }, []);
  return (
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
      <Window>
        <WindowHeader active={true} className="window-header">
          <span>Menu {recordset.ModuloPaciente ? "fac" : "foc"}</span>
        </WindowHeader>
        <div style={{ marginTop: 8 }}>
          <img
            src="https://umgnaranjo.com/wp-content/uploads/2018/11/logo-umg.png"
            alt="refine-logo"
            width={100}
          />
        </div>
        <WindowContent>
          <div
            style={{
              width: 300,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Button
              type="submit"
              value="login"
              disabled={!recordset[0].ModuloPaciente}
              onClick={() => Router.push("/modulo/paciente")}
            >
              Modulo Paciente
            </Button>
            <Button
              type="submit"
              value="login"
              disabled={!recordset[0].ModuloDoctor}
              onClick={() => Router.push("/modulo/doctor")}
            >
              Modulo Doctor
            </Button>
            <Button
              type="submit"
              value="login"
              disabled={!recordset[0].ModuloMedicina}
              onClick={() => Router.push("/modulo/medicina")}
            >
              Modulo Medicina
            </Button>
            <Button
              type="submit"
              value="login"
              onClick={() => Router.push("/modulo/reportes")}
            >
              Modulo Reportes
            </Button>
            <Button
              type="submit"
              value="login"
              disabled={!recordset[0].ModuloReporte}
              onClick={() => Router.push("/modulo/usuarios")}
            >
              Modulo Usuarios
            </Button>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}
