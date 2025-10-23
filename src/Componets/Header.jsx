import { Box, Typography } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"

export default function Header() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1976d2 0%, #3f51b5 100%)",
        color: "white",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: 2,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SchoolIcon sx={{ fontSize: 40 }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
          }}
        >
          CEFR Assessment Results Dashboard Peñalolen
        </Typography>
      </Box>
    </Box>
  )
}
