
// components/RepairHistoryTable.js
import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  //Box,
} from "@mui/material";

export default function RepairHistoryTable({ repairHistory }) {
  const totalCost = repairHistory.reduce((sum, r) => sum + Number(r.cost || 0), 0);

  if (repairHistory.length === 0) return null;

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Repair History
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Repair</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Repair Bill</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairHistory.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.description}</TableCell>
              <TableCell>{r.cost}</TableCell>
              <TableCell>
                {r.bill ? (
                  <a href={URL.createObjectURL(r.bill)} target="_blank" rel="noopener noreferrer">
                    View Bill
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1}>
              <strong>Total</strong>
            </TableCell>
            <TableCell colSpan={2}>
              <strong>{totalCost}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
