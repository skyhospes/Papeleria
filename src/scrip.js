let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll('.box-container .box')];
  for(var i = currentItem; i < currentItem + 4; i++){
    boxes[i].style.display = 'inline-block';
  }
  currentItem += 4;
  if(currentItem >= boxes.length){
    loadMoreBtn.style.display = 'none';
  }
}

//Carrito
const carrito = document.querySelector('#carrito');
const elementos1 = document.querySelector('#lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
  elementos1.addEventListener('click', comprarElemento);
  carrito.addEventListener('click', eliminarElemento);

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento){
  const infoElemento = {
    imagen: elemento.querySelector('img').src,
    titulo: elemento.querySelector('h3').textContent,
    precio: elemento.querySelector('.precio').textContent,
    id: elemento.querySelector('a').getAttribute('data-id'),
  }
  insertarCarrito(infoElemento);
}

function insertarCarrito(infoElemento){
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${infoElemento.imagen}" width=100px height=100px>
    </td>
    <td>${infoElemento.titulo}</td>
    <td>${infoElemento.precio}</td>
    <td><a href="#" class="borrar" data-id="${infoElemento.id}">X</a></td>
  `
  lista.appendChild(row);
}

function eliminarElemento(e){
  e.preventDefault();
  let elemento,
      elementoId;

  if(e.target.classList.contains('borrar')){
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector('a').getAttribute('data-id');
  }
}

function vaciarCarrito(){
  while(lista.firstChild){
    lista.removeChild(lista.firstChild);
  }
}