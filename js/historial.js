document.addEventListener("DOMContentLoaded", function () {

        //   VALIDACIÓN SOLO ADMIN
        const admin = localStorage.getItem("adminActivo");

        if (!admin) {
            alert("Acceso denegado. Solo administradores pueden ver el historial.");
            location.href = "admin.html";
            return;
        }
        
        //   CERRAR SESIÓN
        const logoutBtn = document.getElementById("btnCerrarSesion");

        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("adminActivo");
                alert("Sesión de administrador cerrada.");
                location.href = "admin.html";
            });
        }
        //   FUNCIONES BORRAR Y MODIFICAR
        window.borrarPedido = function (index) {
            let pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];

            if (!confirm("¿Seguro que deseas eliminar este pedido?")) return;

            pedidos.splice(index, 1);
            localStorage.setItem("pedidosRealizados", JSON.stringify(pedidos));

            cargarHistorial();
        };

        window.modificarPedido = function (index) {
            let pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];
            let p = pedidos[index];

            let nuevoNombre = prompt("Nuevo nombre:", p.nombre);
            let nuevoTelefono = prompt("Nuevo teléfono:", p.telefono);
            let nuevaDescripcion = prompt("Nueva descripción:", p.descripcion);

            if (nuevoNombre) p.nombre = nuevoNombre;
            if (nuevoTelefono) p.telefono = nuevoTelefono;
            if (nuevaDescripcion) p.descripcion = nuevaDescripcion;

            pedidos[index] = p;
            localStorage.setItem("pedidosRealizados", JSON.stringify(pedidos));

            cargarHistorial();
        };

        //   MOSTRAR TODA LA LISTA
        function cargarHistorial() {
            const contenedor = document.getElementById("listaPedidos");
            const pedidos = JSON.parse(localStorage.getItem("pedidosRealizados")) || [];

            contenedor.innerHTML = "";

            if (pedidos.length === 0) {
                contenedor.innerHTML = `
                    <p class="text-center text-muted">No hay pedidos registrados.</p>
                `;
                return;
            }

            pedidos.forEach((p, index) => {
                const card = document.createElement("div");
                card.classList.add("card", "mb-3", "shadow");

                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Pedido #${index + 1}</h5>
                        <p><strong>Nombre:</strong> ${p.nombre}</p>
                        <p><strong>Teléfono:</strong> ${p.telefono}</p>
                        <p><strong>Correo:</strong> ${p.correo}</p>
                        <p><strong>Tipo de pastel:</strong> ${p.tipoPastel}</p>
                        <p><strong>Descripción:</strong> ${p.descripcion}</p>
                        <p><strong>Tamaño:</strong> ${p.tamanio}</p>
                        <p><strong>Fecha entrega:</strong> ${p.fechaEntrega}</p>
                        <p><strong>Domicilio:</strong> ${p.domicilio}</p>

                        <div class="text-end">
                            <button class="btn btn-warning btn-sm me-2" onclick="modificarPedido(${index})">
                                <i class="bi bi-pencil-square"></i> Modificar
                            </button>

                            <button class="btn btn-danger btn-sm" onclick="borrarPedido(${index})">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                `;

                contenedor.appendChild(card);
            });
        }

        // Cargar historial al abrir
        cargarHistorial();

    });
