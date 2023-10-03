const inventario = document.getElementById("inventario");
const form = document.getElementById("form");

const busqueda = document.getElementById("button-addon");

busqueda.addEventListener("click", () => {
  mostrarInventario()
});

const inputGroupSelect = document.getElementById("inputGroupSelect");

inputGroupSelect.addEventListener("change", () => {
  mostrarInventario()
})

document.getElementById("borrar").addEventListener('click', () => {
  arraydatos = [];
  localStorage.setItem('datos', JSON.stringify(arraydatos));
  mostrarInventario()
})

const CrearItem = (producto, precio, categoria) => {
  if ((producto.length > 18 || producto.length < 4) || (precio.length > 9 || precio.length < 1) || (categoria.length > 32 || categoria.length < 4)) {
    alert("Información invalida.");
  } else {
    let arraydatos = JSON.parse(localStorage.getItem('datos'));
    if (arraydatos === null) {
      arraydatos = [];
    }
    let item = {
      producto: producto,
      precio: precio,
      categoria: categoria
    }
    arraydatos.push(item)
    localStorage.setItem('datos', JSON.stringify(arraydatos));
    form.reset();
  }
}

function mostrarInventario() {
  let datos = JSON.parse(localStorage.getItem('datos'));
  let buscador = document.getElementById("buscador");
  if (!(buscador.value == "" )) {
    const elemento = datos.find((e) => e.producto == buscador.value);
    if (!elemento) {
      inventario.innerHTML = `<h3 class="mensaje">No hay productos con este nombre</h3>`
    } else {
      inventario.innerHTML = ``;
      inventario.innerHTML += `<div class="card">
        <div class="card-body">
          <h3>Producto: ${elemento.producto}</h3>
          <h3>Precio Unitario: ${elemento.precio}</h3>
          <h3>Categoría: ${elemento.categoria}</h3>
        </div>
      </div>`;
    }
  } else {
    let filtro = inputGroupSelect.value
    if (filtro != "") {
      datosfiltro = datos.filter(datos => datos.categoria == filtro);
      if (!datosfiltro.length) {
        inventario.innerHTML = `<h3 class="mensaje">No hay datos con esta categoría</h3>`
      } else {
        inventario.innerHTML = ``;
        datosfiltro.forEach(dato => {
          inventario.innerHTML += `<div class="card mb-3">
            <div class="card-body">
              <h3>Producto: ${dato.producto}</h3>
              <h3>Precio Unitario: ${dato.precio}</h3>
              <h3>Categoría: ${dato.categoria}</h3>
            </div>
          </div>`;
        });
      }
    } else {
      if (!datos.length) {
        inventario.innerHTML = `<h3 class="mensaje">No hay datos</h3>`
      } else {
        inventario.innerHTML = ``;
        datos.forEach(dato => {
          inventario.innerHTML += `<div class="card mb-3">
            <div class="card-body">
              <h3>Producto: ${dato.producto}</h3>
              <h3>Precio Unitario: ${dato.precio}</h3>
              <h3>Categoría: ${dato.categoria}</h3>
            </div>
          </div>`;
        });
      }
    }
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let producto = document.getElementById("producto").value;
  let precio = document.getElementById("precio").value;
  let categoria = document.getElementById("categoria").value;

  CrearItem(producto, precio, categoria);
  mostrarInventario()
})

document.addEventListener('DOMContentLoaded', mostrarInventario())