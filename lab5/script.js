const name = "Van Lang IT";
console.log(name);


const age = 20;
const nextAge = age + 1;
console.log(nextAge); 


const number = 13;
const isOdd = number % 2 === 1;
console.log(isOdd); 


function triple(x) {
    return x * 3;
}

console.log(triple(10)); 


function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

console.log(sumArray([1, 2, 3]));



function toUpperCaseName(name) {
    return name.toUpperCase();
}

console.log(toUpperCaseName("Nguyen Van A")); 




const orders = [
    { name: "HTML Course", price: 3000000 },
    { name: "JS Course", price: 2500000 },
    { name: "React Course", price: 3200000 }
];

function getTotal(orders) {
    return orders.reduce((sum, order) => sum + order.price, 0);
}

console.log(getTotal(orders));





const user = { firstName: "K i u", lastName: "Trang" };


const { firstName, lastName } = user;

const greeting = `Hello, ${firstName} ${lastName}!`;

console.log(greeting); 




function divide(a, b) {
    try {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

console.log(divide(10, 2));  
console.log(divide(10, 0));  


const box = document.getElementById("box");
let position = 0;

const interval = setInterval(() => {
    position += 1;
    box.style.left = position + "px";
    if (position >= 100) clearInterval(interval);
}, 20);


async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const userList = document.getElementById("userList");

        users.forEach(user => {
            const li = document.createElement("li");
            li.innerText = user.name;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

fetchUsers();


document.getElementById("submitBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;

    if (!email) {
        emailError.innerText = "Email is required";
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.innerText = "Invalid email format";
        isValid = false;
    }

    if (!password) {
        passwordError.innerText = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        passwordError.innerText = "Password must be at least 6 characters";
        isValid = false;
    }

    if (isValid) {
        console.log(`Form submitted: ${email}, ${password}`);
    }
});


const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `${taskText} <span class="delete-btn">Delete</span>`;
        taskList.appendChild(li);

        taskInput.value = "";

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });
    }
});





function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
}

// Cập nhật mỗi giây
setInterval(updateClock, 1000);

// Hiển thị ngay từ lúc load
updateClock();


