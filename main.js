const inventario = document.getElementById("inventario");
const form = document.getElementById("form");

const modal = document.querySelector("#modal");
const btnAbrirModal = document.querySelector("#btn-abrir-modal");
const btnCerrarModal = document.querySelector("#btn-cerrar-modal");

btnAbrirModal.addEventListener("click", () => {
  modal.showModal();
});
btnCerrarModal.addEventListener("click", () => {
  modal.close();
});

document.getElementById("borrar").addEventListener('click', () => {
  arraydatos = [];
  localStorage.setItem('datos', JSON.stringify(arraydatos));
  mostrarInventario()
})

const CrearItem = (producto, precio, categoria) => {
  if ((producto.length > 18 || producto.length < 4) || (precio.length > 9 || precio.length < 5) || (categoria.length > 32 || categoria.length < 4)) {
    alert("Información invalida.")
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
  }
}

function mostrarInventario() {
  let datos = JSON.parse(localStorage.getItem('datos'));
  // let approved = students.filter(student => student.score >= 11);
  if (!datos.length) {
    inventario.innerHTML = `<h3 class="mensaje">No hay datos</h3>`
  } else {
    inventario.innerHTML = ``;
    datos.forEach(dato => {
      inventario.innerHTML += `<div class="ficha">
      <h3>Producto: ${dato.producto}</h3>
      <h3>Precio Unitario: ${dato.precio}</h3>
      <h3>Categoría: ${dato.categoria}</h3>
    </div>`;
    });
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let producto = document.getElementById("producto").value;
  let precio = document.getElementById("precio").value;
  let categoria = document.getElementById("categoria").value;

  CrearItem(producto, precio, categoria);
  form.reset();
  mostrarInventario()
})

document.addEventListener('DOMContentLoaded', mostrarInventario())