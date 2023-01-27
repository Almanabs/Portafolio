const stockProductos = [
  {
    id: 1,
    nombre: "Crash Bandicoot",
    stock: 3,
    desc: "Juego plataformero, niveles dificiles",
    descripcion: "Juego plataformero, niveles dificiles",
    precio: 1200,
    descuento: 100,
    img: "assets/img/Crash.jpg",
    cantidad:1
    
    
  },
  {
    id: 2,
    nombre: "Mortal Kombat X",
    stock: 1,
    desc: "Luchas con los mejores graficos",
    descripcion:"Luchas con los mejores graficos",
    precio: 1500,
    descuento: 500,
    img: "assets/img/mortal.jpg",
    cantidad:1
  },
  {
    id: 3,
    nombre: "Pac Man",
    stock: 1,
    desc: "Juego plataformero, niveles basicos",
    descripcion:"Juego plataformero, niveles basicos",
    precio: 1570,
    descuento: 20,
    img: "assets/img/pacman.jpg",
    cantidad:1
  },
  {
    id: 4,
    nombre: "Dragon Ball Xenoverse",
    stock: 1,
    desc: "Vive la experiencia dragon ball",
    descripcion:"Vive la experiencia dragon ball",
    precio: 1000,
    descuento: 100,
    img: "assets/img/dragonball.jpg",
    cantidad:1
  },
  {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    stock: 1,
    desc: "La historia de Naruto",
    descripcion:"La historia de Naruto",
    precio: 1200,
    descuento: 100,
    img: "assets/img/naruto.jpg",
    cantidad:1
  },
  {
    id: 6,
    nombre: "Shingeki Final Attack",
    stock: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    descripcion:"Eren Jeager vuelve en formato gamer...",
    precio: 1200,
    descuento: 100,
    img: "assets/img/shingeki.jpg",
    cantidad:1
  },
  {
    id: 7,
    nombre: "League of Legends",
    stock: 1,
    desc: "No compres esto por tu bien",
    descripcion:"No compres esto por tu bien",
    precio: 1400,
    descuento: 500,
    img: "assets/img/league.jpg",
    cantidad:1
  },
  {
    id: 8,
    nombre: "Call Of Duty Warzone",
    stock: 1,
    desc: "Dispara como nunca",
    descripcion:"Dispara como nunca",
    precio: 1200,
    descuento: 100,
    img: "assets/img/callduty.jpg",
    cantidad:1
  },
  {
    id: 9,
    nombre: "Fifa 2019",
    stock: 1,
    desc: "Juego de futbol",
    descripcion:"Juego de futbol",
    precio: 1400,
    descuento: 100,
    img: "assets/img/fifa.jpg",
    cantidad:1
  },
  {
    id: 10,
    nombre: "Fornite",
    stock: 1,
    desc: "Battle Royale",
    descripcion:"Battle Royale",
    precio: 1200,
    descuento: 100,
    img: "assets/img/fornite.jpg",
    cantidad:1
  },
];

let cupones = [
  {
    nombre: "10%",
    descuento: 10,
    estado: true,
  },
  {
    nombre: "20%",
    descuento: 20,
    estado: true
  },
  {
    nombre: "50%",
    descuento: 50,
    estado: true
  },
];

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago');

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, stock, descuento, cantidad} = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${stock}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <p class="card-text">Descuento: ${descuento}</p>
      
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad, descuento } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <p>Descripcion :${desc}</p>
      <p>Descuento :${descuento}</p>
      
      
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad, descuento } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            <td>${descuento}</td>
            
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio - prod.descuento,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }




function cargarTabla(listaProductos){
    let cuerpoTabla = document.querySelector(".section_mantenedor_productos tbody");
    cuerpoTabla.innerHTML = "";

    let acumuladorFilas = "";
    listaProductos.forEach(producto => {
        acumuladorFilas += `
                <tr>
                    <th scope="row">${producto.id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
        `
    });
    cuerpoTabla.innerHTML = acumuladorFilas;

}

function buscarProducto(id){
    let producto = new Producto(id);
    return producto.getProduct();
}

crud_form.addEventListener("submit", (event)=>{
    event.preventDefault();
})


//funcion que capture evento del input crud_id

let inputId = document.getElementById("crud_id");
inputId.addEventListener("change", (event) =>{
    event.preventDefault();
    let id =  inputId.value;
    let producto = buscarProducto(id);
    if(producto){
        crud_nombre.value = producto.nombre;
        crud_descripcion.value = producto.descripcion;
        crud_precio.value = producto.precio;
        crud_stock.value = producto.stock;
    }else{
        crud_nombre.value = "";
        crud_descripcion.value = "";
        crud_precio.value = "";
        crud_stock.value = "";

    }
})


function main(){
    let productosStorage = JSON.parse(localStorage.getItem("productos"));
    if(!productosStorage){
        productosStorage = stockProductos;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
    }

    cargarTabla(productosStorage);

}

main();

let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];

 class Producto{
    constructor(id, nombre = "", descripcion = "Sin descripción", precio = 999999, stock = 0){
        this.id = id;
        this.nombre = nombre;
        this.descripcion= descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    getProducts(){
        productosStorage = productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage;
    }
    getProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage.find(producto => producto.id == this.id);
    }
    deleteProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage = productosStorage.filter(producto => producto.id != this.id)
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage;
    }
    updateProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        let producto = productosStorage.find(producto => producto.id ==this.id)
        producto.nombre= this.nombre;
        producto.descripcion= this.descripcion;
        producto.precio = this.precio;
        producto.stock = this.stock;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return producto;
    }
    addProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage.push(
            {
                id: this.id,
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio, 
                stock: this.stock
            }
            )
            localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage
    }

}

let btnmodificar = document.getElementById("btn-modificar");
btnmodificar.addEventListener ("click",(event)=> {
  event.preventDefault();
  let id=crud_id.value;
  let nombre=crud_nombre.value;
  let descripcion=crud_descripcion.value;
  let precio=crud_precio.value;
  let stock=crud_stock.value;
  let producto = new Producto (id, nombre, descripcion, precio, stock);

  if (producto.getProduct()){ 
    producto.updateProduct()
    cargarTabla(producto.getProducts()) 
  }
})


let btnagregar = document.getElementById("btn-agregar");
btnagregar.addEventListener ("click",(event)=> {
  event.preventDefault();
  let id=crud_id.value || "";
  let nombre=crud_nombre.value || "";
  let descripcion=crud_descripcion.value || "";
  let precio=crud_precio.value || "";
  let stock=crud_stock.value || "";
  let producto = new Producto (id, nombre, descripcion, precio, stock);

  if (! producto.getProduct()){
    producto.addProduct()
    cargarTabla(producto.getProducts()) 
  }else{ alert("Ya hay un producto con ese ID" +  producto.id)
    
  }
})


let btneliminar = document.getElementById("btn-eliminar");
btneliminar.addEventListener ("click",(event)=> {
  event.preventDefault();
  let id=crud_id.value;
  let nombre=crud_nombre.value;
  let descripcion=crud_descripcion.value;
  let precio=crud_precio.value;
  let stock=crud_stock.value;
  let producto = new Producto (id, nombre, descripcion, precio, stock);

  if (producto.getProduct()){ 
    producto.deleteProduct()
    cargarTabla(producto.getProducts()) 
  }
})


