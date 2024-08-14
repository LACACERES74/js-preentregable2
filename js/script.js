// Obtiene los elementos del DOM
const main = document.getElementById("Main");
const carritoDOM = document.getElementById("carrito");
const mensajeDOM = document.getElementById("mensaje");

// Definición del menú de comidas
const menuComidas = [
    {
        id: 1,
        nombre: "Hamburguesa",
        precio: 1000,
        img: "imagenes/hamburguesas.png",
    },
    {
        id: 2,
        nombre: "Pizza",
        precio: 1200,
        img: "imagenes/pizza.jpg",
    },
    {
        id: 3,
        nombre: "Ensalada",
        precio: 800,
        img: "imagenes/ensalada.jpg",
    },
    {
        id: 4,
        nombre: "Sushi",
        precio: 1200,
        img: "imagenes/sushi.jpg",
    },
    {
        id: 5,
        nombre: "Tacos",
        precio: 1100,
        img: "imagenes/tacos.jpg",
    },
];

const carrito = [];

// Función para mostrar el menú de comidas
const mostrarMenu = () => {
    main.innerHTML = "";
    menuComidas.forEach(el => {
        const ejemploCard = `
            <div>
                <h3>${el.nombre}</h3>
                <img src="${el.img}" alt="${el.nombre}" />
                <p>Precio: $${el.precio}</p>
                <button class="btnAgregar" data-id="${el.id}">Agregar al Carrito</button>
            </div>
        `;
        main.innerHTML += ejemploCard;
    });
};

// Función para mostrar el carrito de compras
const mostrarCarrito = () => {
    carritoDOM.innerHTML = "";
    
    if (carrito.length === 0) {
        carritoDOM.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }
    
    const carritoAgrupado = carrito.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, cantidad: 1 };
        } else {
            acc[item.id].cantidad++;
        }
        return acc;
    }, {});
    
    let total = 0;
    
    for (const item of Object.values(carritoAgrupado)) {
        carritoDOM.innerHTML += `<h3>${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}</h3>`;
        total += item.precio * item.cantidad;
    }
    
    carritoDOM.innerHTML += `<h3>Total: $${total}</h3>`;
    
    carritoDOM.innerHTML += `
        <button type="button" id="btnProcederCompra">Proceder a Compra</button>
    `;
    
    document.getElementById("btnProcederCompra").addEventListener("click", mostrarDatosCliente);
};

// Función para agregar eventos a los botones de agregar al carrito
const agregarEventoBotones = () => {
    const botonesEventos = document.getElementsByClassName("btnAgregar");
    Array.from(botonesEventos).forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const comida = menuComidas.find(el => el.id == id);
            if (comida) {
                carrito.push(comida);
                mostrarCarrito();
            } else {
                mostrarMensaje(`No se encontró el item con id ${id}`, "error");
            }
        });
    });
};

// Función para mostrar el formulario de datos del cliente
const mostrarDatosCliente = () => {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío. Agregue productos antes de proceder.", "error");
        return;
    }
    
    carritoDOM.innerHTML = `
        <h3>Datos del Cliente</h3>
        <form id="formCliente">
            <label for="nombreCliente">Nombre:</label>
            <input type="text" id="nombreCliente" name="nombreCliente" required><br><br>
            <label for="telefonoCliente">Telefono:</label>
            <input type="telefono" id="telefonoCliente" name="telefonoCliente" required><br><br>
            <label for="direccionCliente">Dirección:</label>
            <input type="text" id="direccionCliente" name="direccionCliente" required><br><br>
            <button type="button" id="btnConfirmar">Confirmar Compra</button>
            <button type="button" id="btnCancelar">Cancelar Compra</button>
        </form>
    `;
    
    document.getElementById("btnConfirmar").addEventListener("click", confirmarCompra);
    document.getElementById("btnCancelar").addEventListener("click", cancelarCompra);
};

// Función para confirmar la compra
const confirmarCompra = () => {
    if (carrito.length === 0) {
        mostrarMensaje("No hay productos en el carrito para confirmar.", "error");
        return;
    }

    const nombre = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefonoCliente").value; // Corrección aquí
    const direccion = document.getElementById("direccionCliente").value;

    if (!nombre || !telefono || !direccion) { // Se asegura de validar el campo de teléfono
        mostrarMensaje("Por favor, complete todos los campos.", "error");
        return;
    }
    
    mostrarMensaje(`Compra confirmada. Total a pagar: $${calcularTotal()}<br>Nombre: ${nombre}<br>Teléfono: ${telefono}<br>Dirección: ${direccion}`, "success");
    
    carrito.length = 0;
    mostrarCarrito();
};

// Función para cancelar la compra
const cancelarCompra = () => {
    if (carrito.length === 0) {
        mostrarMensaje("No hay productos en el carrito para cancelar.", "error");
        return;
    }
    
    carrito.length = 0;
    mostrarCarrito();
};

// Función para calcular el total del carrito
const calcularTotal = () => {
    const carritoAgrupado = carrito.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, cantidad: 1 };
        } else {
            acc[item.id].cantidad++;
        }
        return acc;
    }, {});
    
    return Object.values(carritoAgrupado).reduce((total, item) => total + item.precio * item.cantidad, 0);
};


// Función para mostrar mensajes en el contenedor
const mostrarMensaje = (mensaje, tipo) => {
    mensajeDOM.innerHTML = mensaje;
    mensajeDOM.className = `mensaje ${tipo}`;
};

// Renderizado inicial
mostrarMenu();
agregarEventoBotones();


