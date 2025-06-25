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

const carrito = [];

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

function agregarAlCarrito(nombreProducto) {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
        alert(`"${producto.nombre}" fue agregado al carrito`);
    }
}

function mostrarCarrito() {
    const contenedor = document.getElementById("contenedorCarrito");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((p, index) => {
            contenedor.innerHTML += `<p>${index + 1}. ${p.nombre} - $${p.precio}</p>`;
        });
    }
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

document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Primero debes agregar productos al carrito.");
    } else {
        document.getElementById("seccionDatos").style.display = "block";
        window.scrollTo(0, document.getElementById("seccionDatos").offsetTop);
    }
});

document.getElementById("formDatos").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("cliente").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const erroresDiv = document.getElementById("erroresDatos");

    let errores = [];

    if (nombre === "") errores.push("El nombre es obligatorio.");
    if (direccion === "") errores.push("La dirección es obligatoria.");
    if (correo === "" || !correo.includes("@")) errores.push("El correo es inválido.");

    if (errores.length > 0) {
        erroresDiv.innerHTML = errores.join("<br>");
    } else {
        erroresDiv.innerHTML = "";
        alert(`¡Gracias ${nombre}! Tu pedido será enviado a: ${direccion}`);
        carrito.length = 0; 
        mostrarCarrito();
        document.getElementById("seccionDatos").style.display = "none";
        this.reset();
    }
});

mostrarProductos();
mostrarVendedores();
mostrarCarrito();


