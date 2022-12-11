const balance = document.getElementById('balance')
const ingreso = document.getElementById('ingreso')
const gasto = document.getElementById('gasto')
const lista = document.getElementById('lista')
const form = document.getElementById('form')
const concepto = document.getElementById('concepto')
const cantidad = document.getElementById('cantidad')

let transactions = JSON.parse(localStorage.getItem('transactions')) ?? []

init()

form.addEventListener("submit", (event)) ; {
    event.preventDefault();

    if(concepto.value.trim() === '' || cantidad.value.trim() === '') {
        alert('Añadir concepto y cantidad');
    }else {
        const transaction = {
            id: generateID(),
            concepto: concepto.value,
            cantidad: +cantidad.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues()
		updateLocalStorage()


        concepto.value = ''
        cantidad.value = ''
    }
}


function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//DOM
function addTransactionDOM(transaction) {
    const sign = transaction.cantidad < 0 ? '-' : '+';

    const item = document.createElement('li');

  
    item.classList.add(transaction.cantidad < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    
        ${transaction.text} <span>${sign}${Math.abs(transaction.cantidad)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    lista.appendChild(item);
}

//Actualizar
function updateValues() {
    const cantidades = transactions.map(transaction => transaction.cantidad);

    const total = cantidad.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const ingresos = cantidades
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const gastos = (
        cantidades.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${ingresos}`;
    money_minus.innerText = `$${gastos}`;
}


function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function init() {
    lista.innerHTML =''
	transactions.forEach(addTransactionDOM);
	updateValues
}