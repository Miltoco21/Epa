import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const studentData = [
  {
    name: "Alvarez Gamboa Emilia Antonia",
    rut: "240253607",
    listening: { score: 75, level: "B1" },
    reading: { score: 72, level: "B1" },
    writing: { score: 72, level: "B1" },
    speaking: { score: 70, level: "B1" },
    overall: { score: 85, level: "B1" },
  },
  {
    name: "Barrientos Taivo Pedro",
    rut: "240939088",
    listening: { score: 61, level: "A2" },
    reading: { score: 48, level: "A2" },
    writing: { score: 59, level: "A2" },
    speaking: { score: 53, level: "A2" },
    overall: { score: 85, level: "B1" },
  },
  // ... (resto de los datos de estudiantes)
];

const getLevelColor = (level) => {
  if (level.includes("B2")) return "success";
  if (level === "B1") return "primary";
  if (level === "A2") return "secondary";
  if (level === "A1") return "warning";
  return "default";
};

const getScoreColor = (score) => {
  if (score >= 90) return "#4caf50";
  if (score >= 75) return "#2196f3";
  if (score >= 60) return "#ff9800";
  if (score >= 40) return "#ff5722";
  return "#f44336";
};

export default function StudentResultsTable() {
  const [searchRut, setSearchRut] = useState("");
  const [activeSearchRut, setActiveSearchRut] = useState("");

  const filteredStudents = useMemo(() => {
    if (!activeSearchRut.trim()) {
      return [];
    }
    return studentData.filter(
      (student) => student.rut.toLowerCase() === activeSearchRut.toLowerCase().trim()
    );
  }, [activeSearchRut]);

  const handleSearch = () => {
    setActiveSearchRut(searchRut);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, maxWidth: 500 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ingrese RUT completo..."
            value={searchRut}
            onChange={(e) => setSearchRut(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paper",
              },
            }}
          />
          <Button variant="contained" onClick={handleSearch} sx={{ minWidth: 100, height: 56 }}>
            Buscar
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {!activeSearchRut.trim()
            ? "Ingrese un RUT completo y presione Buscar"
            : filteredStudents.length === 0
            ? "No se encontró ningún estudiante con ese RUT"
            : `Mostrando ${filteredStudents.length} resultado${filteredStudents.length !== 1 ? "s" : ""}`}
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="student results table">
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Student Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>RUT</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Listening
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Reading
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Writing
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Speaking
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Overall
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {!activeSearchRut.trim()
                      ? "Ingrese un RUT completo y presione Buscar para ver los resultados"
                      : "No se encontró ningún estudiante con ese RUT"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow
                  key={student.rut}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                    "&:hover": { bgcolor: "action.selected" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {student.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {student.rut}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: getScoreColor(student.listening.score) }}
                      >
                        {student.listening.score}%
                      </Typography>
                      <Chip
                        label={student.listening.level}
                        size="small"
                        color={getLevelColor(student.listening.level)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: getScoreColor(student.reading.score) }}>
                        {student.reading.score}%
                      </Typography>
                      <Chip label={student.reading.level} size="small" color={getLevelColor(student.reading.level)} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: getScoreColor(student.writing.score) }}>
                        {student.writing.score}%
                      </Typography>
                      <Chip label={student.writing.level} size="small" color={getLevelColor(student.writing.level)} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: getScoreColor(student.speaking.score) }}
                      >
                        {student.speaking.score}%
                      </Typography>
                      <Chip label={student.speaking.level} size="small" color={getLevelColor(student.speaking.level)} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: getScoreColor(student.overall.score) }}>
                        {student.overall.score}%
                      </Typography>
                      {student.overall.level && (
                        <Chip label={student.overall.level} size="small" color={getLevelColor(student.overall.level)} />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}