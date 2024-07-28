const llaves = new Map();
llaves.set('e', 'enter');
llaves.set('i', 'imes');
llaves.set('a', 'ai');
llaves.set('o', 'ober');
llaves.set('u', 'ufat');

const txtaEntrada = document.getElementById('txta-entrada');

const btnEncriptar = document.querySelector("#btn-encriptar");
btnEncriptar.addEventListener("click", encriptar);

const btnDesencriptar = document.querySelector('#btn-desencriptar');
btnDesencriptar.addEventListener("click", desencriptar);

const txtaResultado = document.getElementById('txta-resultado');
const containerNotFound = document.querySelector('#container-notFound');
const btnLimpiar = document.querySelector('#btn-limpiar');
btnLimpiar.addEventListener('click', limpiar);
const btnCopiar = document.querySelector("#btn-copiar");
btnCopiar.addEventListener('click', copiar);

function encriptar() {
    if(!textoValido) {
        return;
    }

    let textoEntrada = txtaEntrada.value;
    let letras = textoEntrada.split('');
    let resultado = '';

    letras.forEach(p => {
        resultado += (llaves.has(p)) ? llaves.get(p) : p;
    });

    if(textoEntrada != "") {
        containerNotFound.style.display = 'none';
        txtaResultado.style.display = 'block';
        txtaResultado.innerHTML = resultado;
    } else {
        containerNotFound.style.display = 'block';
        txtaResultado.style.display = 'none';
    }
}

function desencriptar() {
    if(!textoValido) {
        return;
    }

    let textoEntrada = txtaEntrada.value;
    let letras = textoEntrada.split(' ');
    let resultado = '';

    letras.forEach(p => {
        for (let [clave, valor] of llaves.entries()) {
            let regex = new RegExp(`${valor}`, "g");
            p = p.replace(regex, clave)

            // Manual, pero menos eficiente
            // let size = valor.length;
            // let l = "";
            // for(let i = 0; i < p.length; i++){
            //     if(valor == p.slice(i, (i + size)) && (i + size) != (p.length + 1)){
            //         l += clave;
            //         i = i + size - 1;
            //         continue;
            //     }
            //     l += p[i];
            // }
            // p = l;
        }
        resultado += p + " ";
    });

    if(textoEntrada != "") {
        containerNotFound.style.display = 'none';
        txtaResultado.style.display = 'block';
        txtaResultado.innerHTML = resultado;
    } else {
        containerNotFound.style.display = 'block';
        txtaResultado.style.display = 'none';
    }
}

function copiar() {
    const div = txtaResultado;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(div);
    selection.removeAllRanges();
    selection.addRange(range);

    navigator.clipboard.writeText(selection.toString()).then(() => {
        if(!copiadoAbierto){
            mostrarCopiar();
            setTimeout(ocultarCopiar, 1500);
        }
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });

    selection.removeAllRanges();
}

function limpiar() {
    containerNotFound.style.display = 'block';
    txtaResultado.style.display = 'none';
    txtaResultado.innerHTML = '';
    txtaEntrada.value = '';
}

txtaEntrada.addEventListener('input', () => {
    validarTexto();
});
let textoValido = true;

function validarTexto() {
    let texto = txtaEntrada.value;
    const regex = /^[a-zñ\s0-9]+$/;

    if(texto.length == 0){
        if(errorAbierto){
            ocultarError();
        }
        return;
    }
    textoValido = regex.test(texto);
    if(!textoValido){
        if(!errorAbierto){
            mostrarError();
        }
    } else {
        let pixeles = contenedorError.getBoundingClientRect().x;
        if(errorAbierto || (pixeles >= -530)){
            ocultarError();
        }
    }
}

const contenedorError = document.getElementById('contenedorError');
let errorAbierto = false;

function mostrarError() {
    let pixeles = -530;
    let mover = setInterval(() => {
        pixeles += (pixeles < 0) ? 5 : clearInterval(mover);
        // console.log(pixeles);
        contenedorError.style.left = `${pixeles}px`;
    }, 8);
    errorAbierto = true;
}

function ocultarError() {
    let pixeles = contenedorError.getBoundingClientRect().x;
    let mover = setInterval(() => {
        pixeles += (pixeles >= -530) ? -5 : clearInterval(mover);
        // console.log(pixeles);
        contenedorError.style.left = `${pixeles}px`;
    }, 8);
    errorAbierto = false;
}

const contenedorCopiado = document.getElementById("contenedorCopiado");
let copiadoAbierto = false;

function mostrarCopiar() {
    let pixeles = contenedorCopiado.getBoundingClientRect();
    pixeles = Math.ceil(window.innerWidth - pixeles.right);
    let mover = setInterval(() => {
        pixeles += (pixeles < 0) ? 5 : clearInterval(mover);
        contenedorCopiado.style.right = `${pixeles}px`;
    }, 8);
    copiadoAbierto = true;
}

function ocultarCopiar() {
    let pixeles = contenedorCopiado.getBoundingClientRect();
    pixeles = Math.ceil(window.innerWidth - pixeles.right);
    let mover = setInterval(() => {
        pixeles += (pixeles > -280) ? -5 : clearInterval(mover);
        contenedorCopiado.style.right = `${pixeles}px`;
    }, 8);
    copiadoAbierto = false;
}