// URL API
const API = "https://swapi.dev/api/people";

// Obtener los resultados de la API
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results), paginacion(json.next, json.previous);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

// const pokedata
const pokeData = (data) => {
  let html = "";
  document.getElementById("datosPersonajes").innerHTML = "";
  data.forEach((pk) => {
    let name = pk.name;
    let height = pk.height;
    let mass = pk.mass;
    let gender = pk.gender;
    const URL = pk.homeworld;
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        llenarDatos(json, html, name, height, mass, gender);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  });
};

// Dibujar cards de Pokemons
const llenarDatos = (data, html, name, height, mass, gender) => {
  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 15rem;">';
  html += '<div class="card-body">';
  html += `<h5 class="card-title">Nombre: ${name}</h5>`;
  html += `<h5 class="card-title">Altura: ${height}</h5>`;
  html += `<h5 class="card-title">Masa: ${mass}</h5>`;
  html += `<h5 class="card-title">Genero: ${gender}</h5>`;
  html += `<h5 class="card-title">Planeta Origen: ${data.name}</h5>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("datosPersonajes").innerHTML += html;
};

// Paginacion
const paginacion = (next, previous) => {
  let prevDisabled = "";
  let nextDisabled = "";

  let html = `<li class="page-item ${
    previous == null ? (prevDisabled = "disabled") : (prevDisabled = "")
  }"><a class="page-link" onclick="getData('${previous}')">Previous</a></li> <li class="page-item ${
    next == null ? (nextDisabled = "disabled") : (nextDisabled = "")
  }"><a class="page-link" onclick="getData('${next}')">Next</a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

// Se ejecuta la API
getData(API);
