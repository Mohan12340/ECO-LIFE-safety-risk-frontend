class Employee {
    constructor(id, name, designation, salary) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.salary = salary;
    }
}

let employees = [
    new Employee(101, "Rahul", "Developer", 45000),
    new Employee(102, "Priya", "Manager", 65000),
    new Employee(103, "Arun", "Tester", 40000)
];

let highest = employees[0];

for (let emp of employees) {
    if (emp.salary > highest.salary) {
        highest = emp;
    }
}

console.log("Highest Salaried Employee:");
console.log("ID:", highest.id);
console.log("Name:", highest.name);
console.log("Designation:", highest.designation);
console.log("Salary:", highest.salary);