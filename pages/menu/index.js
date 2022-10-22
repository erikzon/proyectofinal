import Router from "next/router";
import { useState } from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
} from "react95";

export default function Home() {
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
          <span>Menu</span>
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
              disabled={false}
              onClick={() => Router.push("/modulo/paciente")}
            >
              Modulo Paciente
            </Button>
            <Button
              type="submit"
              value="login"
              onClick={() => Router.push("/modulo/doctor")}
            >
              Modulo Doctor
            </Button>
            <Button
              type="submit"
              value="login"
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
