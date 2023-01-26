var pass = 'mi-texto';
var bloqueo = false;
var tiempo = 0;
var nopass = false;
var connection = new WebSocket('ws://' + location.hostname + '/ws', ['arduino']);

connection.onopen = function () {
	console.log('Connected: ');
  getData();
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

  pass = json.pass;
  bloqueo = json.bloqueo; 
  tiempo = json.tiempo;
  nopass = json.nopass;

  if (bloqueo === true)  {
    document.getElementById('bloqueo').checked = true;
  } else if (bloqueo === false) {
    document.getElementById('bloqueo').checked = false;
  }

  if (nopass === true)  {
    document.getElementById('nopass').checked = true;
  } else if (nopass === false) {
    document.getElementById('nopass').checked = false;
  }

  switch (tiempo) {
   case 0:
    document.getElementById('CambiarTiempo1').checked = true;
    break;
   case 60:
    document.getElementById('CambiarTiempo2').checked = true;
    break;
   case 300: 
   document.getElementById('CambiarTiempo3').checked = true;
       break;
   case -1:
    document.getElementById('CambiarTiempo4').checked = true;
    break;

   default: 
       alert('Default case');
  }
  
}

function NoPass(elemento) {
  elemento.value = document.getElementById('nopass').checked;
  sendData(elemento);
}

function ChangePass(elemento) {
  var checkBox = document.getElementById("bloqueo");
    if (checkBox.checked) {   
    pass = document.getElementById('ChangePass').value;
    document.getElementById('CambiarPass').value = pass;
    
    document.getElementById('ChangePass').value = "";
    document.getElementById('ChangePass').placeholder = "Contraseña modificada";
    document.getElementById('Pass2').hidden = true;
    document.getElementById('Pass2').value = "";
    document.getElementById('ChangePass').disabled = true;
    
    document.getElementById('CambiarPass').hidden = true;
    
    sendData(elemento);
  }
}

function myFunction(elemento) {

  var checkBoxNoPass = document.getElementById("nopass");
  if (checkBoxNoPass.checked) {
    document.getElementById('password').value = pass;
    document.getElementById('password').hidden = true;
  }

  var checkBox = document.getElementById("bloqueo");
  var text = document.getElementById('password').value;
    if (text === pass) {
      if (checkBox.checked) {
        DESBLOQUEO();
      } else {
        BLOQUEO();
      } 
    } else {
      if(checkBox.checked){
        document.getElementById('password').value = "";
        BLOQUEO();
        document.getElementById('password').placeholder = "Contraseña INCORRECTA";
      } else { 
        BLOQUEO();
      }
    }
    elemento.value = document.getElementById('bloqueo').checked;
    sendData(elemento);
  };

  function BLOQUEO() {
    document.getElementById('password').placeholder = "Ingrese contraseña";
    document.getElementById('bloqueo').checked = false;
    var checkBoxNoPass = document.getElementById("nopass");
    if (checkBoxNoPass.checked) {
      document.getElementById('password').value = pass;
      document.getElementById('password').hidden = true;
    } else {
      document.getElementById('password').hidden = false;
    }    
    document.getElementById('config-button').hidden = true;
    document.querySelector('.contendorForm').style = "display: none;";
    const collection = document.getElementsByName('TiempoBloqueo');
    for (let i = 0; i < collection.length; i++) {
      collection[i].disabled = true;
    }
    console.log(pass);
  }

  function DESBLOQUEO() {
    document.getElementById('Pass2').hidden = false;
    document.getElementById('ChangePass').disabled = false;

    document.getElementById('config-button').hidden = false;
    document.getElementById('CambiarPass').hidden = false;
    document.getElementById('password').hidden = true;
    document.getElementById('password').value = "";
    document.getElementById('ChangePass').placeholder = "Ingrese nueva contraseña";
    const collection = document.getElementsByName("TiempoBloqueo");
    for (let i = 0; i < collection.length; i++) {
      collection[i].disabled = false;
    }
  }

  /* funciones dvdcom */

function MostrarConfiguracion(){
  const panel = document.querySelector('.contendorForm');
  const display = panel.getAttribute('style');
  display === "display: none;" ? panel.setAttribute("style","display: block;") : panel.setAttribute("style","display: none;");
}

function pass1(){
 var pass1 = document.getElementById('ChangePass').value;
 var pass2 = document.getElementById('Pass2').value;

  if (pass1 !== pass2 ){
    document.getElementById('Pass2').style = "border: solid 2px red";
  } else {
    document.getElementById('Pass2').style = "border: 2px var(--color-principal)";
   }
 validar();
}

function pass2(){

  var pass1 = document.getElementById('ChangePass').value;
  var pass2 = document.getElementById('Pass2').value;
 
  if (pass1 === pass2 ){
    document.getElementById('Pass2').style = "border: 2px var(--color-principal)";
  } else {
    document.getElementById('Pass2').style = "border: solid 2px red";
  }
  validar();
}

function validar(){
  var pass1 = document.getElementById('ChangePass').value;
  var pass2 = document.getElementById('Pass2').value;
  if ((pass1 !== "") && (pass1 === pass2)) {
    document.getElementById('CambiarPass').disabled = false;
  } else {
    document.getElementById('CambiarPass').disabled = true;
   }
}

