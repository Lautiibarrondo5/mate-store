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

let tiempo = 86400; // 2 horas

setInterval(() => {
    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;

    document.getElementById("contador").textContent =
        `${horas}:${minutos}:${segundos}`;

        if(tiempo > 0){
            tiempo = 86400; // reinicia a 24 horas
        }
}, 1000);

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

document
.getElementById("aplicar-cupon")
.addEventListener("click", () => {

    const cupon =
    document.getElementById("cupon").value;

    if(cupon === "MATE10"){

        alert("Cupón aplicado: 10% OFF");

    } else {

        alert("Cupón inválido");
    }
});

let historial = JSON.parse(localStorage.getItem("historial")) || [];

historial.push({
    fecha: new Date().toLocaleDateString(),
    total: totalCompra,
    productos: carrito
});

localStorage.setItem("historial", JSON.stringify(historial));

const productosCatalogo = document.querySelectorAll(".producto");
const btnVerMas = document.getElementById("btn-ver-mas");

const productosIniciales = 8;
let expandido = false;

//Ocultar productos extras al cargar
productos.forEach((producto, index) => {
    if(index >= productosIniciales){
        producto.classList.add("oculto")
    }
});

btnVerMas.addEventListener("click", () => {

    if(!expandido){

        productos.forEach(producto => {
            producto.classList.remove("oculto")
        });

        btnVerMas.textContent = "Ver menos";
        expandido = true;

    } else {

        productos.forEach((producto, index) => {
            if(index >= productosIniciales){
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

mate.addEventListener("change", actualizarCombo);
bombilla.addEventListener("change", actualizarCombo);
termo.addEventListener("change", actualizarCombo);

actualizarCombo();

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

        alert("🧉 Combo agregado ak carrito")
    });
}

const btnRuleta = document.getElementById("girar-ruleta");
const ruleta = document.getElementById("ruleta");
const resultadoRuleta = document.getElementById("resultado-ruleta");

if(btnRuleta){

    const premios = [
        { texto: "🎉 5% OFF", codigo: "MATE5" },
        {texto: "🎉 10% OFF", codigo: MATE10 },
        {texto: "🎉 15% OFF", codigo: "MATE15"},
        {texto: "🚚 Envío Gratis", codigo: "ENVIOFREE"}
    ];

    btnRuleta.addEventListener("click", () => {

        const giro = 1440 + Math.random() * 720;

        ruleta.style.transform = `rotate(${giro})`;

        setTimeout(() => {

            const premio =
                premios[Math.floor(Math.random() * premios.length)];

                resultadoRuleta.innerHTML =
                    `${premio.texto}<br>Código: <strong>${premio.codigo}</strong>`;

                localStorage.setItem(
                    "cuponGanado",
                    premio.codigo
                );
        }, 4000)

        if(localStorage.getItem("ruletaUsada")){
            btnRuleta.disabled = true;
            resultadoRuleta.textContent =
                "Ya utilizaste la ruleta hoy.";
        }

        localStorage.setItem("ruletaUsada", "si");
    });
}
