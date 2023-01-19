
var pass = 'mi-texto';
var bloqueo = 'false';
var tiempo = 0;

var connection = new WebSocket('ws://' + location.hostname + '/ws', ['arduino']);

connection.onopen = function () {
	console.log('Connected: ');
};

connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};

connection.onmessage = function (e) {
  console.log('Server: ', e.data);
  processData(e.data);
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
};

function sendData(elemento)
{

  console.log(elemento.id);
  console.log(elemento.value);  

  let data = {
	  command : "Set",
	  id: elemento.id,
	  status: elemento.value
  }
  let json = JSON.stringify(data);

  connection.send(json);
}


function getData()
{
  let data = {
	  command : "Get"
  }
  let json = JSON.stringify(data);

  connection.send(json);
}

function processData(data)
{
  let json = JSON.parse(data); 
  console.log(json);
  let receivedMsg = 'Received: GPIO ' + json.id + ' ' + (json.status == 1 ? "ON" : "OFF");
  document.getElementById('receivedText').textContent = receivedMsg;
}

function ChangePass(elemento) {
  var checkBox = document.getElementById("bloqueo");
    if (checkBox.checked) {   
    pass = document.getElementById('password').value;
    document.getElementById('CambiarPass').value = pass;
    
    document.getElementById('password').value = "";
    document.getElementById('password').placeholder = "Contraseña modificada";
    document.getElementById('CambiarPass').hidden = true;
    sendData(elemento);
  }
}

function myFunction(elemento) {
  
  var checkBox = document.getElementById("bloqueo");
  var text = document.getElementById('password').value;
    if (text === pass) {
      if (checkBox.checked) {
        document.getElementById('estado').innerHTML = "Monopatín DESBLOQUEADO";
        document.getElementById('estado').style.color = "red";
        document.getElementById('CambiarPass').hidden = false;
        document.getElementById('password').value = "";
        document.getElementById('password').placeholder = "Ingrese nueva contraseña";
        const collection = document.getElementsByName("TiempoBloqueo");
        for (let i = 0; i < collection.length; i++) {
          collection[i].disabled = false;
        }
      } else {
        BLOQUEO();
      } 

    } else {
      if(checkBox.checked){
        document.getElementById('password').value = "";
        document.getElementById('password').placeholder = "Contraseña INCORRECTA";
        BLOQUEO();
      } else { 
        BLOQUEO();
        document.getElementById('password').placeholder = "Ingrese contraseña";
      }
    }

    elemento.value = document.getElementById('bloqueo').checked;
    sendData(elemento);
  };

  function BLOQUEO() {
    document.getElementById('estado').innerHTML = "Monopatín BLOQUEADO";
    document.getElementById('password').placeholder = "Ingrese contraseña";
    document.getElementById('estado').style.color = "green";
    document.getElementById('bloqueo').checked = false;
    document.getElementById('CambiarPass').hidden = true;
    document.getElementsByName('TiempoBloqueo').disabled = true;
    
    const collection = document.getElementsByName("TiempoBloqueo");
    for (let i = 0; i < collection.length; i++) {
      collection[i].disabled = true;
    }
    

  }

/* funciones dvdcom */

function MostrarConfiguracion(){
  const panel = document.querySelector('.contendorForm');
  const display = panel.getAttribute('style');
  display === "display: none" ? panel.setAttribute("style","display: block") : panel.setAttribute("style","display: none");
}

function cambiarPass(){
  console.log('Codigo que cambia la contraseña');
}
