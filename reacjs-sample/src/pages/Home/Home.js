import InputView from "./InputView";
import {Box, Container, Grid, Stack} from "@mui/material";
import DashboardView from "./DashBoardView";


export default function Home() {
	return (<Box component="main">
		<Stack direction="row" spacing={2} justifyContent="space-between">
			<InputView/>
			<DashboardView/>
		</Stack>

	</Box>);
}




