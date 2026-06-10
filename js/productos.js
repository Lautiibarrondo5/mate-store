//==== BUSCADOR ====


const buscador = document.getElementById("buscador");

if(buscador) {

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLocaleLowerCase();

    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        const nombre = producto.querySelector("h3")
        .textContent
        .toLowerCase();

        if(nombre.includes(texto)){
            producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }
    });
});
}

// ==== CARRITO ====

const botones = document.querySelectorAll(".btn-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        

        const producto = boton.closest(".producto");

        if (!producto) return;

        const nombre = producto.querySelector("h3").textContent;

        const precioTexto = producto.querySelector("p").textContent;

        const precio = parseInt(
            precioTexto.replace(/\D/g, "")
        ) || 0;


        carrito.push({
            nombre,
            precio
        });
    if (typeof mostrarToast === "function") {
    mostrarToast(nombre);
    }
actualizarCarrito();
    });
});

// Eliminar producto
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("eliminar")) {

        const indice = e.target.dataset.id;

        carrito.splice(indice, 1);

        actualizarCarrito();
    }
});

// Vaciar carrito
if (vaciarBtn) {

    vaciarBtn.addEventListener("click", () => {

        carrito = [];

        actualizarCarrito();
    });
}


// Actualizar carrito
function actualizarCarrito() {

    console.log("Carrito actual:", carrito);

    if (listaCarrito) {
        listaCarrito.innerHTML = "";

        let total = 0;

        carrito.forEach((item, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                ${item.nombre}
                - $${item.precio.toLocaleString("es-AR")}
                <button class="eliminar" data-id="${index}">
                    ❌
                </button>
            `;

            listaCarrito.appendChild(li);

            total += item.precio;
        });

        if (totalHTML) {
            totalHTML.textContent = total.toLocaleString("es-AR");
        }
    }

    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
actualizarCarrito();