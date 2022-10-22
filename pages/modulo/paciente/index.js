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
} from "react95";

export default function paciente() {
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
                  <TableHeadCell>hola</TableHeadCell>
                  <TableHeadCell>adios</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableDataCell>miau</TableDataCell>
                  <TableDataCell>caracatungi</TableDataCell>
                </TableRow>
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
