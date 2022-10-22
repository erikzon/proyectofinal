import Router from "next/router";
import { useState } from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  TextField,
  Button,
} from "react95";

export default function Home() {
  const [usuario, setusuario] = useState("erick@miumg.edu.gt");
  const [contrasena, setcontrasena] = useState("prueba");

  const login = (usuario,contrasena) => {
    Router.push('/menu')
  }

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
          <span>Login</span>
        </WindowHeader>
        <div style={{ marginTop: 8 }}>
          <img
            src="https://umgnaranjo.com/wp-content/uploads/2018/11/logo-umg.png"
            alt="refine-logo"
            width={100}
          />
        </div>
        <WindowContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(usuario, contrasena);
            }}
          >
            <div style={{ width: 500 }}>
              <div style={{ display: "flex" }}>
                <TextField
                  placeholder="User Name"
                  fullWidth
                  value={usuario}
                  onChange={(e) => {
                    setusuario(e.target.value);
                  }}
                />
              </div>
              <br />
              <TextField
                placeholder="contrasena"
                fullWidth
                type="password"
                value={contrasena}
                onChange={(e) => {
                  setcontrasena(e.target.value);
                }}
              />
              <br />
              <Button type="submit" value="login">
                Iniciar Sesion
              </Button>
            </div>
          </form>
        </WindowContent>
      </Window>
    </div>
  );
};
