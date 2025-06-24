const productos = [
    { nombre: "Cama Suave", precio: 14990, imagen: "cama.jpg"},
    { nombre: "Comedero Automático", precio: 24990, imagen: "comedero-automatico.jpg"},
    { nombre: "Juguete Interactivo", precio: 15990, imagen: "juguete-interactivo.jpg"},
    { nombre: "Juguete Ratón", precio: 3990, imagen: "juguete-raton.jpg"},
    { nombre: "Rascador", precio: 19990, imagen: "rascador.jpg"}
];

const vendedores = [
    { nombre: "Jefe de Tienda - Mango", imagen: "jefemango.jpeg"},
    { nombre: "Vendedor 1 - Kief", imagen: "kief.jpeg"},
    { nombre: "Vendedor 2 - Lucifer", imagen: "lucifer.jpeg"},
    { nombre: "Vendedor 3 - Ania", imagen: "ania.jpeg" }
];

function mostrarProductos() {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
            </div>
        `;
    });
}

function agregarAlCarrito(producto) {
    alert(`"${producto}" fue agregado al carrito`);
}

function mostrarVendedores() {
    const contenedor = document.getElementById("contenedorVendedores");
    contenedor.innerHTML = "";

    vendedores.forEach((vendedor, index) => {
        contenedor.innerHTML += `
            <div class="vendedor">
                <img src="${vendedor.imagen}" alt="${vendedor.nombre}" onclick="verVendedor(${index})">
                <h4>${vendedor.nombre}</h4>
            </div>
        `;
    });
}

function verVendedor(indice) {
    const vendedor = vendedores[indice];
    const modal = document.getElementById("modalImagen");
    const imgGrande = document.getElementById("imagenGrande");

    imgGrande.src = vendedor.imagen;
    modal.style.display = "flex";
}

document.getElementById("cerrarModal").addEventListener("click", function () {
    document.getElementById("modalImagen").style.display = "none";
});

document.getElementById("modalImagen").addEventListener("click", function (e) {
    if (e.target.id === "modalImagen") {
        this.style.display = "none";
    }
});

document.getElementById("formProducto").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreBuscado = document.getElementById("nombre").value.trim();
    const divErrores = document.getElementById("errores");

    if (nombreBuscado === "") {
        divErrores.innerHTML = "Por favor ingresa el nombre del producto.";
        return;
    }

    const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase());

    if (productoEncontrado) {
        divErrores.innerHTML = "";
        agregarAlCarrito(productoEncontrado.nombre);
        this.reset();
    } else {
        divErrores.innerHTML = `No se encontró el producto "${nombreBuscado}".`;
    }
});

mostrarProductos();
mostrarVendedores();

