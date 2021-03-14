export const milkOptions = [
  {value: 'cowMilk', label: 'Коровье молоко', amount: 'л', count: '', class: 'milkProduct'},
  {value: 'goatMilk', label: 'Козье молоко', amount: 'л', count: '', class: 'milkProduct'},
  {value: 'curd', label: 'Творог', amount: 'кг', count: '', class: 'milkProduct'},
  {value: 'sourСream', label: 'Сметана', amount: 'кг', count: '', class: 'milkProduct'},
  {value: 'cheese', label: 'Сыр', amount: 'кг', count: '', class: 'milkProduct'},
  {value: 'kefir', label: 'Кефир', amount: 'л', count: '', class: 'milkProduct'},
]

export const meatOptions = [
  {value: 'курица', label: 'Курица', amount: 'кг', count: '', class: 'meatProduct'},
  {value: 'говядина', label: 'Говядина', amount: 'кг', count: '', class: 'meatProduct'},
  {value: 'свинина', label: 'Свинина', amount: 'кг', count: '', class: 'meatProduct'},
]

export const groupedOptions = [
  {
    label: 'Молочная продукция',
    options: milkOptions,
  },
  {
    label: 'Мясо',
    options: meatOptions,
  },
]