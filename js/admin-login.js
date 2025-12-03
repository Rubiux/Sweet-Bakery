// CONTROL DE SESIÓN SOLO PARA ADMIN

document.addEventListener("DOMContentLoaded", () => {

    const adminLogueado = localStorage.getItem("adminActivo");

    // Si el admin ya está logueado, ocultamos el login
    if (adminLogueado) {
        document.getElementById("login").style.display = "none";
        document.getElementById("btnPedidos").style.display = "block";
        document.getElementById("btnCerrarSesion").style.display = "block";
    } else {
        // Si NO está logueado, solo mostramos el login
        document.getElementById("login").style.display = "block";
        document.getElementById("btnPedidos").style.display = "none";
        document.getElementById("btnCerrarSesion").style.display = "none";
    }

    // Cerrar sesión del admin
    document.getElementById("btnCerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("adminActivo");
        alert("Sesión de administrador cerrada.");
        location.reload();
    });

});


// FUNCIÓN PARA INICIAR SESIÓN DEL ADMIN

function iniciarSesionAdmin() {

    const usuarioIngresado = document.getElementById("loginUsuario").value;
    const passwordIngresado = document.getElementById("loginPassword").value;

    // Usuario y contraseña válidos del admin
    const adminUser = "admin";
    const adminPass = "1234";

    if (usuarioIngresado === adminUser && passwordIngresado === adminPass) {

        // Guardar sesión
        localStorage.setItem("adminActivo", usuarioIngresado);

        // Recargar para que entren los botones del panel admin
        location.reload();

    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function eliminarPedido(indice) {
    const pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];

    if (confirm("¿Seguro que deseas eliminar este pedido?")) {
        pedidos.splice(indice, 1);  // Elimina el pedido
        localStorage.setItem("pedidosRealizados", JSON.stringify(pedidos));
        location.reload();
    }
}

function editarPedido(indice) {
    let pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];
    let p = pedidos[indice];

    const nuevoNombre      = prompt("Nombre:", p.nombre);
    const nuevoTelefono    = prompt("Teléfono:", p.telefono);
    const nuevoCorreo      = prompt("Correo:", p.correo);
    const nuevoTipoPastel  = prompt("Tipo de pastel:", p.tipoPastel);
    const nuevaDescripcion = prompt("Descripción:", p.descripcion);
    const nuevoTamanio     = prompt("Tamaño:", p.tamanio);
    const nuevaFecha       = prompt("Fecha de entrega:", p.fechaEntrega);
    const nuevoDomicilio   = prompt("Domicilio:", p.domicilio);

    // Actualización
    pedidos[indice] = {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
        correo: nuevoCorreo,
        tipoPastel: nuevoTipoPastel,
        descripcion: nuevaDescripcion,
        tamanio: nuevoTamanio,
        fechaEntrega: nuevaFecha,
        domicilio: nuevoDomicilio
    };

    localStorage.setItem("pedidosRealizados", JSON.stringify(pedidos));
    alert("Pedido actualizado correctamente.");
    location.reload();
}
