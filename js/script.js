const llaves = new Map();
llaves.set('e', 'enter');
llaves.set('i', 'imes');
llaves.set('a', 'ai');
llaves.set('o', 'ober');
llaves.set('u', 'ufat');

var txtaEntrada = document.getElementById('txta-entrada');
var btnEncriptar = document.querySelector("#btn-encriptar");
btnEncriptar.addEventListener("click", encriptar);

var txtaResultado = document.getElementById('txta-resultado');
var containerNotFound = document.querySelector('#container-notFound');
var btnLimpiar = document.querySelector('#btn-limpiar');
btnLimpiar.addEventListener('click', limpiar);

function encriptar(){
    let textoEntrada = txtaEntrada.value;
    let letras = textoEntrada.split('');
    let resultado = '';

    letras.forEach(p => {
        resultado += (llaves.has(p)) ? llaves.get(p) : p;
    });
    
    containerNotFound.style.display = 'none';
    txtaResultado.style.display = 'block';
    txtaResultado.innerHTML = resultado;
}

function limpiar() {
    containerNotFound.style.display = 'block';
    txtaResultado.style.display = 'none';
    txtaResultado.innerHTML = '';
    txtaEntrada.value = '';
}