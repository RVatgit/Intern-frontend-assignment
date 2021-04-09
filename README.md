# Intern-frontend-assignment
 Coding Assignment Please find the coding assignment problem statement below and its divided into Two levels: - Adithya owns a car wash business and needs help to manage various bills from his vendors. Build an application to help Adithya manage his monthly bills. The application must be written in React with Redux, using appropriate middleware. The bill manager shows a bill dashboard (list of bills) with the total monthly billed amount. LEVEL-1: • The user must be able to manually add, edit and remove bills. (update the state locally) • The user must be able to filter bills by category. (category filter dropdown) • Draw a time-series chart of the monthly billing cycle. LEVEL-2: Adithya wants to be able to see a minimum number of bills that should be paid (n), such that their total value does not exceed the monthly budget value while meeting the condition that no more bills can be added from the remaining bills.. Highlight all the bills that should be paid. Sample bills JSON and inputs: Monthly Budget: x, let’s say 50000 {  "bills": [  {  "id": 1,  "description": "Dominoes",  "category": "FoodNDining",  "amount": “430",  "date": "01-02-2020"  },  {  "id": 2,  "description": "Car wash",  "category": "utility",  "amount": “500",  "date": "01-06-2020"  },  {  "id": 3,  "description": "Amazon",  "category": "shopping",  "amount": "2030",  "date": "01-07-2020"  },  {  "id": 4,  "description": "House rent",  "category": "Food & Dining",  "amount": "35900",  "date": "01-03-2020"  },  {  "id": 5,  "description": "Tuition",  "category": "education",  "amount": "2200",  "date": "01-12-2020"  },  {  "id": 6,  "description": "Laundry",  "category": "Personal Care",  "amount": "320",  "date": "01-14-2020"  },  {  "id": 7,  "description": "Vacation",  "category": "Travel",  "amount": "3430",  "date": "01-18-2020"  }  ] }
