import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  //CardContent,
  Stack,
  Box,
  IconButton,
  Paper,
  //Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RepairHistoryTable from "./RepairHistoryTable";

export default function EquipmentRecordApp() {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(getEmptyForm());
  const [editIndex, setEditIndex] = useState(null);
  const [searchSerial, setSearchSerial] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [newRepair, setNewRepair] = useState({ description: "", cost: "", bill: null });
  
  const users = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "viewer", password: "view123", role: "viewer" },
  ];

  function getEmptyForm() {
    return {
      itemName: "",
      category: "",
      brandModel: "",
      serialNumber: "",
      purchaseDate: "",
      supplier: "",
      price: "",
      warrantyPeriod: "",
      warrantyExpiryDate: "",
      location: "",
      assignedTo: "",
      condition: "",
      //repairHistory: "",
      //repairCost: "",
      lastServiceDate: "",
      nextServiceDate: "",
      notes: "",
      itemDoccuments: null,
    };
  }

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === "repairBill" ? files[0] : value });
  };

  const handleAddOrUpdate = () => {
     form.repairHistory = repairs;
    if (editIndex !== null) {
      const updated = [...records];
      updated[editIndex] = form;
      setRecords(updated);
      setEditIndex(null);
    } else {
      setRecords([...records, form]);
    }
    setForm(getEmptyForm());
  };
  const handleRepairChange = (e) => {
  const { name, value, files } = e.target;
  setNewRepair({
    ...newRepair,
    [name]: name === "bill" ? files[0] : value,
  });
  };

  const addRepair = () => {
  setRepairs([...repairs, newRepair]);
  setNewRepair({ description: "", cost: "", bill: null });
  };

  const handleEdit = (index) => {
    setForm(records[index]);
    setEditIndex(index);
  };

  const handleDeleteRecord = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updated = [...records];
      updated.splice(index, 1);
      setRecords(updated);
      if (editIndex === index) setEditIndex(null);
    }
  };

  const handleSearch = () => {
    const result = records.find(
      (rec) => rec.serialNumber.toLowerCase() === searchSerial.toLowerCase()
    );
    setSearchResult(result || null);
  };

  const handleExportPDF = () => {
    if (!searchResult) return;
    const printWindow = window.open("", "_blank");
    let content = "";

    Object.entries(searchResult).forEach(([key, value]) => {
      if (key === "repairBill" && value) {
        content += `<p><strong>${key}:</strong> View Bill (file cannot be printed)</p>`;
      } else {
        content += `<p><strong>${key}:</strong> ${value ?? ""}</p>`;
      }
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Export Record</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            p { margin: 6px 0; }
            h2 { color: #1976d2; }
          </style>
        </head>
        <body>
          <h2>Equipment Record</h2>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!user) {
    return (
      <Container maxWidth="xs" sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Equipment Record App
      </Typography>

      {user.role === "admin" && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null ? "Edit Equipment Record" : "Add New Equipment"}
          </Typography>
            <RepairHistoryTable repairHistory={repairs} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Repair Description"
              name="description"
              value={newRepair.description}
              onChange={handleRepairChange}
              fullWidth
            />
            <TextField
              label="Cost"
              name="cost"
              type="number"
              value={newRepair.cost}
              onChange={handleRepairChange}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Upload Bill
              <input type="file" name="bill" hidden onChange={handleRepairChange} />
            </Button>
            <Button onClick={addRepair} variant="contained">
              Add Repair
            </Button>
          </Stack>

          <Stack spacing={2}>
            {[
              "itemName",
              "category",
              "brandModel",
              "serialNumber",
              "purchaseDate",
              "supplier",
              "price",
              "warrantyPeriod",
              "warrantyExpiryDate",
              "location",
              "assignedTo",
              "condition",
              //"repairHistory",
              //"repairCost",
              "lastServiceDate",
              "nextServiceDate",
              "notes",
            ].map((key) =>
              key === "repairHistory" || key === "notes" ? (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  multiline
                  minRows={2}
                  value={form[key]}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  fullWidth
                  type={key.includes("Date") ? "date" : "text"}
                  InputLabelProps={key.includes("Date") ? { shrink: true } : {}}
                />
              )
            )}
            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Upload Repair Bill
              <input
                type="file"
                name="repairBill"
                hidden
                onChange={handleChange}
                accept="application/pdf,image/*"
              />
            </Button>
            {form.repairBill && (
              <Typography variant="body2" color="textSecondary">
                Selected File: {form.repairBill.name}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleAddOrUpdate}
              fullWidth
              size="large"
              sx={{ borderRadius: 2 }}
            >
              {editIndex !== null ? "Update Record" : "Add Record"}
            </Button>
          </Stack>
        </Paper>
      )}

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Equipment by Serial Number
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Serial Number"
            value={searchSerial}
            onChange={(e) => setSearchSerial(e.target.value)}
            fullWidth
            size="small"
          />
          <Button variant="contained" onClick={handleSearch} size="medium">
            Search
          </Button>
        </Stack>

        {searchResult ? (
          <Card
            variant="outlined"
            sx={{ mt: 3, borderRadius: 3, boxShadow: 1, p: 2 }}
          >
            {Object.entries(searchResult).map(([k, v]) => (
              <Box key={k} mb={1}>
                <Typography variant="subtitle2" component="span" sx={{ fontWeight: "bold" }}>
                  {k}:
                </Typography>{" "}
                {k === "repairBill" && v ? (
                  <a
                    href={URL.createObjectURL(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2" }}
                  >
                    View Bill
                  </a>
                ) : (
                  <Typography variant="body2" component="span">
                    {v?.toString()}
                  </Typography>
                )}
              </Box>
            ))}
   
            {searchResult.repairHistory && Array.isArray(searchResult.repairHistory) && (
              <RepairHistoryTable repairHistory={searchResult.repairHistory} />
            )}
            <Button
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleExportPDF}
              sx={{ mt: 2 }}
              fullWidth
            >
              Export / Print
            </Button>
          </Card>
        ) : (
          
          searchSerial && (
            <Typography color="error" sx={{ mt: 2 }}>
              No record found.
            </Typography>
           
        )
        )}
      </Paper>

      <Typography variant="h6" gutterBottom>
        All Equipment Records
      </Typography>

      <Stack spacing={3}>
        {records.length === 0 && (
          <Typography color="text.secondary">No records yet.</Typography>
        )}

        {records.map((rec, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ borderRadius: 3, boxShadow: 1, p: 2 }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {rec.itemName || "Unnamed Item"}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Serial Number: {rec.serialNumber || "-"}
                </Typography>
              </Box>
              {user.role === "admin" && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(index)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRecord(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
