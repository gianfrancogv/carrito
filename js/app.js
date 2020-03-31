//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Event Listeners
cargarEventListeners();
function cargarEventListeners() {
    //Se activa cuando presionan "Agregar al carrito"
    cursos.addEventListener('click', comprarCurso);
    //Cuando se elimina un curso en el carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    //Mostrar elementos del Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCurso(infoCurso);
}

function insertarCurso(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

function eliminarCurso(e) {
    e.preventDefault();

    let curso;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito () {
    listaCursos.innerHTML = '';
    return false;
}

//Almacena cursos al Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;

    cursos = obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
    let cursosLS;

    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

function leerLocalStorage() {
    let cursosLC;

    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}