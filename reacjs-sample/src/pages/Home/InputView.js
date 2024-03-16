import React, {useEffect, useState} from "react";
import {Button, Chip, Container, Grid, IconButton, List, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {getSuggestMoneyList} from "../../utils/suggest_money";
import {CategoryModel, ExpenseModel, MoneySourceModel} from "../../data/models/category";
import ExpenseCard from "./ExpenseCard";

export default function InputView() {
	const [inputValue, setInputValue] = useState(null)
	const [suggestMoneyList, setSuggestMoneyList] = useState([]);
	const [categoryList, setCategoryList] = useState([new CategoryModel(1, 'Food', 'Expense'), new CategoryModel(2, 'Salary', 'Income'), new CategoryModel(3, 'Coffee', 'Expense')]);
	const [selectedCategory, setSelectedCategory] = useState(new CategoryModel(1, 'Food', 'Expense'))
	const [moneySourceList, setMoneySourceList] = useState([new MoneySourceModel(1, 'Wallet'), new MoneySourceModel(2, 'Bank')]);
	const [selectedMoneySource, setSelectedMoneySource] = useState(new MoneySourceModel(1, 'Wallet'))
	const [expenseList, setExpenseList] = useState([]);
	const [note, setNote] = useState('');

	useEffect(() => {
		setSuggestMoneyList(getSuggestMoneyList(inputValue));
	}, [inputValue])

	const handleChange = (event) => {
		const regex = /^[0-9]*$/;
		if (regex.test(event.target.value)) {
			setInputValue(event.target.value);
		}
	};

	const handleClick = () => {
		if (inputValue !== null) {
 			const newExpense = new ExpenseModel(expenseList.length + 1, new Date().toLocaleDateString(), inputValue, selectedCategory.name, selectedMoneySource.name, note);
			setExpenseList([newExpense,...expenseList]);
			setInputValue(null)
			setNote(null)
		}

	};
	return (<div>
		<Container maxWidth="sm" style={{background: '#c0d7f1'}}>

			<Grid container spacing={2} alignItems="start">
				<Grid item xs={8}>
					<TextField
						label="Nhập số tiền"
						variant="outlined"
						fullWidth
						onChange={handleChange}
						value={inputValue || ''} // Ensure that value is not null
						InputProps={{
							endAdornment: inputValue && (<IconButton
								aria-label="clear input"
								onClick={() => setInputValue("")}
							>
								<CloseIcon/>

							</IconButton>)
						}}
					/>
					<Typography>VND: {new Intl.NumberFormat("vi-VN").format(inputValue)}</Typography>

					{suggestMoneyList.map((suggestMoney, index) => (
						<Chip label={new Intl.NumberFormat("vi-VN").format(suggestMoney)} variant="outlined"
						      key={index}
						      style={{marginRight: '8px', marginBottom: '8px'}}
						      onClick={() => setInputValue(suggestMoney)}
						>{suggestMoney.name}</Chip>))}
					<TextField
						label="Nhập ghi chú"
						variant="outlined"
						fullWidth
						onChange={ (event) => setNote(event.target.value)}
						value={note || ''} // En
					/>

				</Grid>
				<Grid item xs={4}>
					<Button disabled={inputValue === null} fullWidth variant="contained" color="primary"
					        style={{maxHeight: '56px', minHeight: '56px'}}
					        onClick={handleClick}>
						Lưu
					</Button>
				</Grid>
			</Grid>

			<Typography>Loại chi tiêu</Typography>
			{categoryList.map((category, index) => (
				<Chip label={category.name} variant={(category.id === selectedCategory.id) ? "filled" : "outlined"}
				      key={index}
				      style={{marginRight: '8px', marginBottom: '8px'}}
				      onClick={() => setSelectedCategory(category)}
				>{category.name}</Chip>))}
			<Typography>Nguồn tiền</Typography>
			{moneySourceList.map((moneySource, index) => (
				<Chip label={moneySource.name} variant={(moneySource.id === selectedMoneySource.id) ? "filled" : "outlined"}
				      key={index}
				      style={{marginRight: '8px', marginBottom: '8px'}}
				      onClick={() => setSelectedMoneySource(moneySource)}
				>{moneySource.name}</Chip>))}
		</Container>
		<Container maxWidth="sm">
			<List>
				{
					expenseList.map((expense, index) => (
						<ExpenseCard
							date={expense.date}
							money={expense.money}
							category={expense.category}
							moneySource={expense.moneySource}
							note={expense.note}
							key={index}
						/>
					))
				}
			</List>

		</Container>
	</div>);
}