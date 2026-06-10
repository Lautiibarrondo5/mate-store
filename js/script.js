const elementos = document.querySelectorAll(".scroll-anim");

window.addEventListener("scroll", () => {
    elementos.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
});

function mostrarToast(nombre) {
    const toast = document.getElementById("toast-carrito");

    if (!toast) return;

    toast.textContent = `${nombre} agregado al carrito`;

    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 1500);
}


const contador = document.getElementById("contador");

if (contador) {

let tiempo = 86400; // 2 horas

setInterval(() => {
    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;

    contador.textContent =
        `${horas}:${minutos}:${segundos}`;

        if(tiempo > 0){
            tiempo--;
        } else {
            tiempo = 86400;
        }
}, 1000);
}

document.querySelectorAll(".favorito").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("activo");
    });
});

const botonesFiltro = document.querySelectorAll(".filtros button");
const productos = document.querySelectorAll(".producto");

botonesFiltro.forEach(btn => {

    btn.addEventListener("click", () => {

        const categoria = btn.dataset.categoria;

        productos.forEach(producto => {

            if (
                categoria === "todos" ||
                producto.dataset.categoria === categoria
            ){
                producto.style.display = "block"; 
            } else {
                producto.style.display = "none";
            }
        });
    });
});


const btnCupon = document.getElementById("aplicar-cupon");

if(btnCupon){
    btnCupon.addEventListener("click", () => {
        const cupon =
            document.getElementById("cupon").value;

        if(cupon === "MATE10"){
            alert("Cupón aplicado: 10% OFF");
        } else {
            alert("Cupón inválido");
        }
    });
}


let historial = JSON.parse(localStorage.getItem("historial")) || [];

const carritoHistorial =
    JSON.parse(localStorage.getItem("carrito")) || [];

const totalCompra = carritoHistorial.reduce(
    (total, producto) => total + producto.precio,
    0
);

historial.push({
    fecha: new Date().toLocaleDateString(),
    total: totalCompra,
    productos: carritoHistorial
});

localStorage.setItem("historial", JSON.stringify(historial));

const productosCatalogoIniciales = 8;

const productosCatalogo =
    document.querySelectorAll(".producto");

productosCatalogo.forEach((producto, index) => {
    if(index >= productosCatalogoIniciales){
        producto.classList.add("oculto");
    }
});
const btnVerMas = document.getElementById("btn-ver-mas");


let expandido = false;

//Ocultar productos extras al cargar
productosCatalogo.forEach((producto, index) => {
    if(index >= productosCatalogoIniciales){
        producto.classList.add("oculto")
    }
});

if(btnVerMas) {
btnVerMas.addEventListener("click", () => {
    if(!expandido){

        productosCatalogo.forEach(producto => {
            producto.classList.remove("oculto");
        });

        btnVerMas.textContent = "Ver menos";
        expandido = true;

    } else {

        productosCatalogo.forEach((producto, index) => {
                if(index >= productosCatalogoIniciales){
                    producto.classList.add("oculto");
                }
            });

        btnVerMas.textContent = "Ver más productos";
        expandido = false;

        document.getElementById("catalogo").scrollIntoView({
            behavior: "smooth"
        });
    }
});
}

    

const mate = document.getElementById("mate");
const bombilla = document.getElementById("bombilla");
const termo = document.getElementById("termo");
const precioCombo = document.getElementById("precio-combo");

function actualizarCombo() {
    const total =
        Number(mate.value) +
        Number(bombilla.value) +
        Number(termo.value);

    precioCombo.textContent =
        `$${total.toLocaleString("es-AR")}`;

}
if (mate && bombilla && termo && precioCombo) {

mate.addEventListener("change", actualizarCombo);
bombilla.addEventListener("change", actualizarCombo);
termo.addEventListener("change", actualizarCombo);

actualizarCombo();
}

const btnCombo = document.getElementById("agregar-combo");

if(btnCombo){

    btnCombo.addEventListener("click", () => {

        const total =
            Number(mate.value) +
            Number(bombilla.value) +
            Number(termo.value);

        const combo = {
            nombre: "Combo Matero Personalizado",
            precio: total
        };

        let carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(combo);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        alert("🧉 Combo agregado al carrito");
    });
}

const btnRuleta = document.getElementById("girar-ruleta");
const ruleta = document.getElementById("ruleta");
const resultadoRuleta = document.getElementById("resultado-ruleta");

if(btnRuleta){

    const premios = [
        { texto: "🎉 5% OFF", codigo: "MATE5" },
        {texto: "🎉 10% OFF", codigo: "MATE10" },
        {texto: "🎉 15% OFF", codigo: "MATE15"},
        {texto: "🚚 Envío Gratis", codigo: "ENVIOFREE"}
    ];

btnRuleta.addEventListener("click", () => {

    const giro = 1440 + Math.random() * 720;

    ruleta.style.transform = `rotate(${giro}deg)`;

    setTimeout(() => {

        const premio =
            premios[Math.floor(Math.random() * premios.length)];

        resultadoRuleta.innerHTML =
            `${premio.texto}<br>Código: <strong>${premio.codigo}</strong>`;

        localStorage.setItem(
            "cuponGanado",
            premio.codigo
        );

    }, 4000);

    localStorage.setItem("ruletaUsada", "si");

});
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot")

let current = 0;

function mostrarSlide(index){

    slides.forEach(slide =>
        slide.classList.remove("active")
    );

    dots.forEach(dot =>
        dot.classList("active")
    );

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function siguienteSlide(){

    current++;

    if(current >= slides.length){
        current = 0;
    }

    mostrarSlide(current);
}

function anteriorSlide(){

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    mostrarSlide(current);
}

document.querySelectorAll(".next").addEventListener("click", siguienteSlide);
document.querySelectorAll(".prev").addEventListener("click", anteriorSlide);

setInterval(siguienteSlide, 4000);


const btnBuscador = document.getElementById("abrir-buscador");

if(btnBuscador){
    btnBuscador.addEventListener("click", () => {
        document
            .getElementById("buscador")
            .classList.toggle("mostrar");
    });
}
