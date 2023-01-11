export function procesarPedido() {
  carrito.forEach((prod) => {
    const contenedorCompra = document.querySelector('#contenedorCompra')
    const { id, nombre, precio, desc, img, cantidad } = prod;
    const div = document.createElement("div");
    div.innerHTML += `
          <div class="modal-contenedor">
            <div>
            <img class="img-fluid img-carrito" src="${assets/img}"/>
            </div>
            <div>
            <p>Producto: ${nombre}</p>
          <p>Precio: ${precio}</p>
          <p>Cantidad :${cantidad}</p>
          <p>Descripcion :${desc}</p>
          <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
            </div>
          </div>
          
      
          `;
    contenedorCompra.appendChild(div);
    console.log(contenedorCompra);
  });
}

//LÓGICA DESCUENTO POR CUPÓN
document
  .getElementById("btn-descuento")
  .addEventListener("click", function (event) {
    let cuponIngresado = document.getElementById("input-cupon").value;

    let cuponEncontrado = cupones.find(
      (cupon) => cupon.nombre == cuponIngresado
    );


    if (cuponEncontrado && cuponEncontrado.estado == true) {
      alert("cupón encontrado.");
      precioTotalCompra =
        precioTotalCompra -
        (precioTotalCompra * cuponEncontrado.descuento) / 100;
      document.querySelector(
        "#precio-total"
      ).innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`;
      cuponEncontrado.estado = false;
    } else {
      alert("El cupón no existe. / o está caducado");
    }
  });
