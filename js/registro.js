// aver esto sirve para mostrar formulario según el botón
function mostrar(id) {
  // esto es para ocultar ambos y que no salgan los dos desplegados !!!!!!!
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "none";

  //aca es por si es juana o chana  Muestrar el que corresponde
  document.getElementById(id).style.display = "block";
}

// Guardar usuarios en localStorage
function registrar() {
  const usuario = document.getElementById("regUsuario").value;
  const password = document.getElementById("regPassword").value;
//esto es para que no deje campos vacios no se asusten todo lo vimos en clases no es mi pex si no entienden
  if (!usuario || !password) {
    alert("Completa todos los campos.");
    return;
  }

  localStorage.setItem(usuario, password);
  document.getElementById("mensaje").innerText = "Usuario registrado correctamente.";
}

// Iniciar sesión
function iniciarSesion() {
  const usuario = document.getElementById("loginUsuario").value;
  const password = document.getElementById("loginPassword").value;

  const passGuardada = localStorage.getItem(usuario);

  if (passGuardada === password) {
    document.getElementById("mensaje").innerText = "Bienvenido, " + usuario + "!";

     // Redirección ala pagina principal a los 3 segundos
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000); 
    //se puede cambiar el tiempo esto son microsegundos 2000=2s, 1000=1s
    localStorage.setItem("usuarioActivo", usuario);//guardamos el usuario para que se active esa opcion preferencial



  } else {
    document.getElementById("mensaje").innerText = "Usuario o contraseña incorrectos.";
  }
}

//no se como le van hacer para que modifiquen el codigo pero porfa no borren mis comentarios :)
//si no les aviento a kike en tanga 