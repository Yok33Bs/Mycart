const products = [

    product1 = {
        name: "Palito",
        id: "p1",
        price: 2000,
        image: "productsCarrito_img/palito.jpeg",
    },

    product2 = {
        name: "Caja sorpresa",
        id: "p2",
        price: 5000,
        image: "productsCarrito_img/cajaSorpresa.jpg",
    },

    product3 = {
        name: "Pack fichas de Alf",
        id: "p3",
        price: 1000,
        image: "productsCarrito_img/fichasAlf.jpg",
    },

    product4 = {
        name: "Alma de Bart Simpson",
        id: "p4",
        price: 4000,
        image: "productsCarrito_img/almaDeBart.jpeg",
    },

    product5 = {
        name: "Khlav Kalash",
        id: "p5",
        price: 5000,
        image: "productsCarrito_img/khlavKalash.jpg",
    },
];

let listProducts = "";
let tHead = document.querySelector('#thead');
let tabla = document.querySelector('#prodList');

const number_format = (amount, decimals) => {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

products.forEach(e => {

    listProducts += `
        <tr class="prod">
            <td class="_name">${e.name}</td>
            <td class="_price">$${number_format(e.price)}</td>
            <td class="_img"><img src = "${e.image}" class="img"/></td>            
            <td class="_inputNum">
                <input 
                type="checkbox" 
                data-price="${e.price}" 
                onclick="addCart( this)" 
                name="${e.name}" 
                id="${e.id}"                     
                class= "checks">
                <div class"quantity" id="textQuantity${e.id}"></div>
            </td>
        </tr>
        `
});

tabla.innerHTML = listProducts;

const detalle = document.querySelector('#detalle');
const btnClearCart = document.querySelector('#vaciar-carrito');
const checks = document.querySelectorAll('.checks');

const addCart = element => {

    let textQuantity = document.querySelector(`#textQuantity${element.id}`)
    textQuantity.innerHTML = (element.checked)
        ? `<input type="number"
            class="cant" 
            min="1" 
            value="1" 
            onchange="updateDataPrice();" 
            id="quantity-${element.id}">`
        : '';

    updateDataPrice();
};

const updateDataPrice = () => {

    let productSelected = [];
    checks.forEach(element => {

        let id = element.id;

        products.forEach(p => (element.checked && id == p.id) && productSelected.push(p));

    });

    setDetails(productSelected);

};

const setDetails = _products => {

    const productsDetails = _products.map(p => {

        const valueItemQuantity = parseInt(document.querySelector(`#quantity-${p.id}`).value);

        const subTotal =  parseInt(p.price) * valueItemQuantity  ; 
        
        return {
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price ,
            quantity: valueItemQuantity,
            subTotal
        }
    });
    printTable(productsDetails);
};

const printTable = _productsDetails => {

    detalle.innerHTML = "";
    let contentBodyTable = "";

    _productsDetails.forEach(pd => {

        contentBodyTable += `
            <tr>
                <td> ${pd.id}</td>
                <td> ${pd.name}</td>
                <td> ${ pd.quantity }</td>
                <td> ${number_format(pd.price)}</td>
                <td class="subTotal"> ${number_format(pd.subTotal)}</td>
            </tr>` ;
    });

    detalle.innerHTML = contentBodyTable ;
};

btnClearCart.addEventListener('click',()=>{

    detalle.innerHTML = "";

    checks.forEach( e => {

        e.checked = false;

        addCart(e)
    });
    
    
});
