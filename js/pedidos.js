document.addEventListener("DOMContentLoaded", function () {

    // Cerrar sesión
    const cerrar = document.getElementById("btnCerrarSesion");
    if (cerrar) {
        cerrar.addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            alert("Sesión cerrada correctamente.");
            location.href = "index.html";
        });
    }

    // FORMULARIO
    const form = document.getElementById("formPedido");

    if (!form) {
        console.error("ERROR: No se encontró el formulario con id 'formPedido'");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener datos
        const pedido = {
            nombre: document.getElementById("nombre").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            tipoPastel: document.getElementById("tipoPastel").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            tamanio: document.getElementById("tamanio").value,
            fechaEntrega: document.getElementById("fechaEntrega").value,
            domicilio: document.getElementById("domicilio").value.trim(),
            fechaRegistro: new Date().toLocaleString()
        };

        // Guardar
        let pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];
        pedidos.push(pedido);
        localStorage.setItem("pedidosRealizados", JSON.stringify(pedidos));

        alert("Pedido guardado correctamente.");
        form.reset();
    });

});
