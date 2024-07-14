const llaves = new Map();
llaves.set('e', 'enter');
llaves.set('i', 'imes');
llaves.set('a', 'ai');
llaves.set('o', 'ober');
llaves.set('u', 'ufat');

var txtaEntrada = document.getElementById('txta-entrada');

var btnEncriptar = document.querySelector("#btn-encriptar");
btnEncriptar.addEventListener("click", encriptar);

var btnDesencriptar = document.querySelector('#btn-desencriptar');
btnDesencriptar.addEventListener("click", desencriptar);

var txtaResultado = document.getElementById('txta-resultado');
var containerNotFound = document.querySelector('#container-notFound');
var btnLimpiar = document.querySelector('#btn-limpiar');
btnLimpiar.addEventListener('click', limpiar);
var btnCopiar = document.querySelector("#btn-copiar");
btnCopiar.addEventListener('click', copiar);

function encriptar() {
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

function desencriptar() {
    let textoEntrada = txtaEntrada.value;
    let letras = textoEntrada.split(' ');
    let resultado = '';

    letras.forEach(p => {
        for (let [clave, valor] of llaves.entries()) {
            let regex = new RegExp(`${valor}`, "g");
            p = p.replace(regex, clave)
        }
        resultado += p + " ";
    });

    containerNotFound.style.display = 'none';
    txtaResultado.style.display = 'block';
    txtaResultado.innerHTML = resultado;
}

function copiar() {
    const div = txtaResultado;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(div); // Selecciona el contenido del div
    selection.removeAllRanges(); // Limpia cualquier selección anterior
    selection.addRange(range); // Añade la nueva selección

    // Copia el texto al portapapeles
    navigator.clipboard.writeText(selection.toString()).then(() => {
        alert('Texto copiado: ' + selection.toString());
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });

    // Limpia la selección
    selection.removeAllRanges();
}

function limpiar() {
    containerNotFound.style.display = 'block';
    txtaResultado.style.display = 'none';
    txtaResultado.innerHTML = '';
    txtaEntrada.value = '';
}

var contenedorError = document.getElementById('contendorError');

function mostrarError() {
    let pixeles = -530;
    let mover = setInterval(() => {
        pixeles += (pixeles < 0) ? 5 : clearInterval(mover);
        // console.log(pixeles);
        contenedorError.style.left = `${pixeles}px`;
    }, 8);
}

function ocultarError() {
    let pixeles = contenedorError.getBoundingClientRect().x;
    let mover = setInterval(() => {
        pixeles += (pixeles >= -530) ? -5 : clearInterval(mover);
        // console.log(pixeles);
        contenedorError.style.left = `${pixeles}px`;
    }, 8);
}