//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');

//Event Listeners
cargarEventListeners();
function cargarEventListeners() {
    //Se activa cuando presionan "Agregar al carrito"
    cursos.addEventListener('click', comprarCurso);
}

//Funciones
function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    console.log(curso);
}