const elementos = document.querySelectorAll(".scroll-anim");

window.addEventListener("scroll", () => {
    elementos.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
});

let carrito = [];

function mostrarToast(nombre) {
    const toast = document.getElementById("toast-carrito");

    toast.textContent = `${nombre} agregado al carrito`;

    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 1500);
}

document.querySelectorAll(".btn-carrito").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.getAttribute("data-nombre");
        const precio = Number(btn.getAttribute("data-precio"));

        
        carrito.push({ nombre, precio});

        mostrarToast(nombre);
    });
});