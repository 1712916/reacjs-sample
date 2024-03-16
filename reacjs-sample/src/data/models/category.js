export class CategoryModel {
	constructor(id, name, type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}
}

export class ExpenseModel {
	constructor(id, date, money, category, moneySource, note) {
		this.id = id;
		this.date = date;
		this.money = money;
		this.category = category;
		this.moneySource = moneySource;
		this.note = note;
	}
}

export class MoneySourceModel {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}