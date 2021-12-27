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
/*
    product6 = {
        name: "",
        id: "p6",
        price: ,
        image: "",
    },

    product7= {
        name: "",
        id: "p7",
        price: ,
        image: "",
    },
    
    product8 = {
        name: "",
        id: "p8",
        price: ,
        image: "",
    },

    product9 = {
        name: "",
        id: "p9",
        price: ,
        image: "",
    },

    product10 = {
        name: "",
        id: "p10",
        price: ,
        image: "",
    },
*/
];

let listProducts = "";
let tabla = document.querySelector('#prodList');

products.forEach(e => {

    listProducts += `
        <tr>
            <td><input 
                type="checkbox" 
                data-price="${e.price}" 
                onclick="addCart('${e.id}')" 
                name="product1" 
                id="${e.id}" 
                class= "checks"
                >
            </td>
            <td>${e.name}</td>
            <td>$${e.price}</td>  
            <td><img src = "${e.image}" class="img"/></td>
            <td>
            <input 
                type="number" 
                class="cant"
                min="0" 
                id="quantity${e.id}"
                placeholder="¿Cuantas vas a querer?"
                >
            </td>
        </tr>
        `
   
});

tabla.innerHTML = listProducts;

let cantidad = document.querySelector(".cant")
const detalle = document.querySelector(".detail")


const addCart = element => {
    const checkElement = document.querySelector(`#${element}`)
    updateDataPrice()
};


const updateDataPrice = () => {
    let totalSell = 0 
    const checks = document.querySelectorAll('.checks')
    checks.forEach( element => {

        let precio = parseInt(element.dataset.price);

        if( element.checked ){
            const quantityItemElement = document.querySelector(`#quantity${element.id}`).value  ;
            const quantityItem = quantityItemElement != '' ? parseInt( quantityItemElement ) : 0 ; 
            
            totalSell += ( precio * quantityItem ) ;
        }

        
    })
    console.log(totalSell)
}
//detalle.innerHTML = 
