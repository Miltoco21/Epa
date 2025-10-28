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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import { coursesData, getAvailableCourses } from "./studentData";

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
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchRut, setSearchRut] = useState("");
  const [activeSearchRut, setActiveSearchRut] = useState("");

  const availableCourses = useMemo(() => getAvailableCourses(), []);

  const currentCourseStudents = useMemo(() => {
    if (!selectedCourse) return [];
    return coursesData[selectedCourse]?.students || [];
  }, [selectedCourse]);

  const filteredStudents = useMemo(() => {
    if (!selectedCourse || !activeSearchRut.trim()) {
      return [];
    }
    return currentCourseStudents.filter(
      (student) => student.rut.toLowerCase() === activeSearchRut.toLowerCase().trim()
    );
  }, [selectedCourse, activeSearchRut, currentCourseStudents]);

  const handleSearch = () => {
    if (!selectedCourse) {
      return;
    }
    setActiveSearchRut(searchRut);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSearchRut("");
    setActiveSearchRut("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Resultados de Estudiantes
        </Typography>

        {/* Selector de Curso */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel id="course-select-label">Seleccionar Curso</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              value={selectedCourse}
              label="Seleccionar Curso"
              onChange={handleCourseChange}
              startAdornment={
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {availableCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        
        </Box>

        {/* Buscador de RUT */}
        <Box sx={{ display: "flex", gap: 2, maxWidth: 500 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ingrese RUT sin puntos ni guión"
            value={searchRut}
            onChange={(e) => setSearchRut(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!selectedCourse}
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
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!selectedCourse || !searchRut.trim()}
            sx={{ minWidth: 100, height: 56 }}
          >
            Buscar
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {!selectedCourse
            ? "Primero seleccione un curso"
            : !activeSearchRut.trim()
            ? "Ingrese RUT sin puntos ni guión y presione Buscar"
            : filteredStudents.length === 0
            ? "No se encontró ningún estudiante con ese RUT en este curso"
            : `Mostrando ${filteredStudents.length} resultado${
                filteredStudents.length !== 1 ? "s" : ""
              }`}
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="student results table">
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                RUT
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Listening
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Reading
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Writing
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Speaking
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Overall
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!selectedCourse ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <SchoolIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography variant="body1" color="text.secondary">
                      Seleccione un curso para comenzar
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <SearchIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography variant="body1" color="text.secondary">
                      {!activeSearchRut.trim()
                        ? "Ingrese un RUT completo y presione Buscar para ver los resultados"
                        : "No se encontró ningún estudiante con ese RUT en este curso"}
                    </Typography>
                  </Box>
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: getScoreColor(student.listening.score),
                        }}
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: getScoreColor(student.reading.score),
                        }}
                      >
                        {student.reading.score}%
                      </Typography>
                      <Chip
                        label={student.reading.level}
                        size="small"
                        color={getLevelColor(student.reading.level)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: getScoreColor(student.writing.score),
                        }}
                      >
                        {student.writing.score}%
                      </Typography>
                      <Chip
                        label={student.writing.level}
                        size="small"
                        color={getLevelColor(student.writing.level)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: getScoreColor(student.speaking.score),
                        }}
                      >
                        {student.speaking.score}%
                      </Typography>
                      <Chip
                        label={student.speaking.level}
                        size="small"
                        color={getLevelColor(student.speaking.level)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: getScoreColor(student.overall.score),
                        }}
                      >
                        {student.overall.score}%
                      </Typography>
                      <Chip
                        label={student.overall.level}
                        size="small"
                        color={getLevelColor(student.speaking.level)}
                      />
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