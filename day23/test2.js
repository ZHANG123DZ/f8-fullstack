const categories = [
	{
		id: 1,
		name: "Electronics",
		children: [
			{
				id: 2,
				name: "Laptops",
				children: [
					{
						id: 3,
						name: "Apple",
					},
					{
						id: 4,
						name: "Dell",
					},
				],
			},
			{
				id: 5,
				name: "Headphones",
			},
		],
	},
	{
		id: 6,
		name: "Books",
		children: [
			{
				id: 7,
				name: "Fiction",
				children: [
					{
						id: 8,
						name: "Thrillers",
					},
					{
						id: 9,
						name: "Mystery",
					},
				],
			},
			{
				id: 10,
				name: "Non-Fiction",
			},
		],
	},
];

const flattenCategories = (categories, level=0) => {
	if (!Array.isArray(categories)) throw new Error("Mảng không hợp lệ");
	let flatten = [];
	for (const category of categories){
		flatten.push({id: category.id, name: category.name, level });
		if (category.children && category.children.length > 0 ){
			flatten = flatten.concat(flattenCategories(category.children, level+1));
		}
	}
	return flatten;
}

console.log(flattenCategories(categories));
const getCategoryName = (categories, categoryId) => {
	const flatten = flattenCategories(categories);
	for (const item of flatten) {
		if (item.id === categoryId ) {
			return item.name;
		}
	}
	return null ;
}
console.log(getCategoryName(categories, 3)); // Output: "Apple"
console.log(getCategoryName(categories, 10)); // Output: "Non-Fiction"
console.log(getCategoryName(categories, 99)); // Output: null
