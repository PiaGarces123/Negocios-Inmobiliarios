/* =========================================================
   PANEL PROPIETARIO
   ========================================================= */


const currentOwnerId = 1;


/* =========================================================
   DATOS DE DEMOSTRACIÓN
   ========================================================= */

/*
 * ownerId permite determinar qué propiedades pertenecen
 * a cada propietario. Por el momenot lo dejamos fijo para demostración
 */
const properties = [

    {
        id: 1,
        ownerId: 1,
        title: "Casa Moderna con Vista Panorámica",
        addr: "Av. Del Libertador 8500, Palermo",
        price: 280000,
        unit: "",
        tipo: "venta",
        status: "disponible",
        amb: 4,
        banos: 3,
        m2: 320,
        img: "../../assets/media/prop1.jpg"
    },

    {
        id: 2,
        ownerId: 1,
        title: "Departamento con Terraza y Vista",
        addr: "Armenia 1234, Palermo, CABA",
        price: 1800,
        unit: "/mes",
        tipo: "alquiler",
        status: "alquilado",
        amb: 3,
        banos: 2,
        m2: 120,
        img: "../../assets/media/prop2.jpg"
    },

    {
        id: 3,
        ownerId: 1,
        title: "Casa Familiar con Jardín y Pileta",
        addr: "Calle Las Palmas 456, Tigre",
        price: 195000,
        unit: "",
        tipo: "venta",
        status: "vendido",
        amb: 5,
        banos: 3,
        m2: 480,
        img: "../../assets/media/prop3.jpg"
    },

    {
        id: 4,
        ownerId: 2,
        title: "PH Premium con Vista a Buenos Aires",
        addr: "Alicia Moreau de Justo 740, Puerto Madero",
        price: 520000,
        unit: "",
        tipo: "venta",
        status: "reservado",
        amb: 5,
        banos: 4,
        m2: 290,
        img: "../../assets/media/prop4.jpg"
    },

    {
        id: 5,
        ownerId: 2,
        title: "Casa Moderna con Piscina Infinita",
        addr: "Av. Del Libertador 8900, Belgrano",
        price: 520000,
        unit: "",
        tipo: "venta",
        status: "disponible",
        amb: 5,
        banos: 4,
        m2: 480,
        img: "../../assets/media/detail_hero.jpg"
    },

    {
        id: 6,
        ownerId: 3,
        title: "Living Moderno Palermo Hollywood",
        addr: "Humboldt 2356, Palermo, CABA",
        price: 2200,
        unit: "/mes",
        tipo: "alquiler",
        status: "vendido",
        amb: 2,
        banos: 1,
        m2: 65,
        img: "../../assets/media/detail_t1.jpg"
    },

    {
        id: 7,
        ownerId: 3,
        title: "Cocina Premium Recoleta",
        addr: "Av. Alvear 1801, Recoleta, CABA",
        price: 380000,
        unit: "",
        tipo: "venta",
        status: "reservado",
        amb: 4,
        banos: 3,
        m2: 210,
        img: "../../assets/media/detail_t2.jpg"
    },

    {
        id: 8,
        ownerId: 4,
        title: "Suite Maestro en Nordelta",
        addr: "Av. del Golf 1200, Nordelta",
        price: 145000,
        unit: "",
        tipo: "venta",
        status: "disponible",
        amb: 3,
        banos: 2,
        m2: 180,
        img: "../../assets/media/detail_t3.jpg"
    }

];


/* =========================================================
   ELEMENTOS DEL DOM
   ========================================================= */

const listaPropiedades = document.getElementById("listaPropiedades");
const filtroEstado = document.getElementById("filtroEstado");

const totalPropiedades = document.getElementById("totalPropiedades");
const propiedadesDisponibles =
    document.getElementById("propiedadesDisponibles");

const propiedadesAlquiladas =
    document.getElementById("propiedadesAlquiladas");

const propiedadesVendidas =
    document.getElementById("propiedadesVendidas");


/* =========================================================
   PROPIEDADES DEL PROPIETARIO
   ========================================================= */

function obtenerPropiedadesDelPropietario() {

    return properties.filter(function (property) {
        return property.ownerId === currentOwnerId;
    });

}


/* =========================================================
   FORMATEAR PRECIO
   ========================================================= */

function formatearPrecio(price) {

    return new Intl.NumberFormat("es-AR", {
        maximumFractionDigits: 0
    }).format(price);

}


/* =========================================================
   NOMBRE DEL ESTADO
   ========================================================= */

function obtenerNombreEstado(status) {

    switch (status) {

        case "disponible":
            return "Disponible";

        case "alquilado":
            return "Alquilada";

        case "vendido":
            return "Vendida";

        case "reservado":
            return "Reservada";

        default:
            return status;
    }

}


/* =========================================================
   ACTUALIZAR RESUMEN
   ========================================================= */

function actualizarResumen() {

    const ownerProperties = obtenerPropiedadesDelPropietario();

    const disponibles = ownerProperties.filter(function (property) {
        return property.status === "disponible";
    });

    const alquiladas = ownerProperties.filter(function (property) {
        return property.status === "alquilado";
    });

    const vendidas = ownerProperties.filter(function (property) {
        return property.status === "vendido";
    });


    totalPropiedades.textContent = ownerProperties.length;

    propiedadesDisponibles.textContent = disponibles.length;

    propiedadesAlquiladas.textContent = alquiladas.length;

    propiedadesVendidas.textContent = vendidas.length;

}


/* =========================================================
   CREAR TARJETA DE PROPIEDAD
   ========================================================= */

function crearPropiedadHTML(property) {

    const estadoNombre = obtenerNombreEstado(property.status);

    return `
        <article class="propiedad-card">

            <div class="propiedad-imagen">
                <img
                    src="${property.img}"
                    alt="${property.title}"
                >
            </div>


            <div class="propiedad-info">

                <h3 class="propiedad-titulo">
                    ${property.title}
                </h3>

                <p class="propiedad-direccion">
                    ${property.addr}
                </p>


                <div class="propiedad-datos">

                    <span>
                        ${property.amb} ambientes
                    </span>

                    <span>
                        ${property.banos} baños
                    </span>

                    <span>
                        ${property.m2} m²
                    </span>

                    <span>
                        ${property.tipo === "venta" ? "Venta" : "Alquiler"}
                    </span>

                </div>


                <div class="propiedad-precio">

                    ${property.tipo === "venta" ? "$" : "$"}
                    ${formatearPrecio(property.price)}
                    ${property.unit}

                </div>

            </div>


            <div class="propiedad-estado">

                <span class="estado estado-${property.status}">
                    ${estadoNombre}
                </span>

            </div>

        </article>
    `;
}


/* =========================================================
   MOSTRAR PROPIEDADES
   ========================================================= */

function mostrarPropiedades() {

    const ownerProperties = obtenerPropiedadesDelPropietario();

    const filtro = filtroEstado.value;


    const propiedadesFiltradas = ownerProperties.filter(function (property) {

        if (filtro === "todos") {
            return true;
        }

        return property.status === filtro;

    });


    if (propiedadesFiltradas.length === 0) {

        listaPropiedades.innerHTML = `
            <div class="sin-resultados">
                No hay propiedades que coincidan con el filtro seleccionado.
            </div>
        `;

        return;
    }


    listaPropiedades.innerHTML = propiedadesFiltradas
        .map(function (property) {
            return crearPropiedadHTML(property);
        })
        .join("");

}


/* =========================================================
   EVENTOS
   ========================================================= */

if (filtroEstado) {

    filtroEstado.addEventListener("change", function () {
        mostrarPropiedades();
    });

}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function inicializarPanel() {

    actualizarResumen();

    mostrarPropiedades();

}


inicializarPanel();