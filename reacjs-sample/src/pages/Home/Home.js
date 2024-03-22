import InputView from "../ExpenseInput/InputView";
import { Box, Container, Grid, Stack } from "@mui/material";
import DashboardView from "./DashBoardView";

export default function Home() {
  return (
    <Box component="main">
      <InputView />
      {/*<Stack direction="row" spacing={2} justifyContent="space-between">*/}
      {/*  <InputView />*/}
      {/*  /!*<DashboardView/>*!/*/}
      {/*</Stack>*/}
    </Box>
  );
}
