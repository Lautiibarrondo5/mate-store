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
    document-getElementById("cupon").value;

    if(cupon === "MATE10"){

        alert("Cupón aplicado: 10% OFF");

    } else {

        alert("Cupón inválido");
    }
});
