// Cargar historial
function cargarHistorial() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let contenedor = document.getElementById("historialPedidos");

    contenedor.innerHTML = "";

    pedidos.forEach((p, index) => {
        contenedor.innerHTML += `
            <div class="pedido">
                <p><strong>Nombre:</strong> ${p.nombre}</p>
                <p><strong>Teléfono:</strong> ${p.telefono}</p>
                <p><strong>Descripción:</strong> ${p.descripcion}</p>
                <p><strong>Fecha:</strong> ${p.fecha}</p>

                <button onclick="modificarPedido(${index})">Modificar</button>
                <button onclick="borrarPedido(${index})">Eliminar</button>
            </div>
            <hr>
        `;
    });
}

// Borrar pedido
function borrarPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.splice(index, 1); // Elimina por posición

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    cargarHistorial(); // Actualiza la vista
}

// Modificar pedido
function modificarPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let pedido = pedidos[index];

    let nuevoNombre = prompt("Nuevo nombre:", pedido.nombre);
    let nuevoTelefono = prompt("Nuevo teléfono:", pedido.telefono);
    let nuevaDescripcion = prompt("Nueva descripción:", pedido.descripcion);
    let nuevaFecha = prompt("Nueva fecha:", pedido.fecha);

    pedidos[index] = {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha
    };

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    cargarHistorial();
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", cargarHistorial);
