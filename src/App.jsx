

import { Box } from "@mui/material"
import StudentResultsTable7D from "./Componets/StudentsResultTable7D"
// import SummaryCards from "@/components/summary-cards"
import Header from "./Componets/Header"

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Header />

      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 2, py: 4 }}>
        {/* <SummaryCards /> */}

        <Box sx={{ mt: 4 }}>
          <StudentResultsTable7D />
        </Box>
      </Box>
    </Box>
  )
}
