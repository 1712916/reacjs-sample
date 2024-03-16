import {Card, Typography} from "@mui/material";
import React from "react";

export default  function ExpenseCard({date, money, category, moneySource, note}) {
	return (<Card>
		<Typography>{date}</Typography>
		<Typography>{money}</Typography>
		<Typography>{category}</Typography>
		<Typography>{moneySource}</Typography>
		<Typography>{note}</Typography>
	</Card>)
}