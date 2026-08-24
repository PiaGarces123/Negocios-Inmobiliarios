# 📄 Informe y Documentación del Proyecto: Negocios Inmobiliarios

**Materia / Curso:** Programación y Desarrollo Web  
**Proyecto:** Sitio Web para Inmobiliaria — *Negocios Inmobiliarios*  
**Estado del Proyecto:** ✅ 100% Completo y Funcional  
**Tecnologías Utilizadas:** HTML5 Semántico, CSS3 Moderno, JavaScript Vanilla (ES6+)

---

## 1. Resumen Ejecutivo y Propósito del Sitio

**Negocios Inmobiliarios** es una plataforma web integral diseñada para la búsqueda, visualización y gestión de propiedades inmobiliarias en Argentina (venta y alquiler).

El proyecto fue desarrollado bajo estándares modernos de desarrollo web, priorizando la **accesibilidad, semántica HTML5, diseño responsivo adaptable a múltiples dispositivos, rendimiento óptimo y una experiencia de usuario (UX/UI) fluida e interactiva**.

---

## 2. Mapa del Sitio y Páginas Desarrolladas

El proyecto supera el mínimo requerido de páginas, ofreciendo un ecosistema de **5 páginas interconectadas**:

### 🏠 1. Página Principal (`index.html`)
* **Hero interactivo:** Título de impacto, buscador integrado por tipo de operación, tipo de propiedad y ubicación.
* **Propiedades destacadas:** Grilla responsive de inmuebles en venta y alquiler con badges de estado (*Disponible*, *Reservado*, *Vendido*), precios formateados, características y botón de favoritos.
* **Sección de Servicios:** Asesoramiento integral, tasaciones profesionales y gestión legal/notarial.
* **Formulario de Contacto & Tasación:** Validación de campos y diseño limpio.
* **Footer institucional:** 3 columnas (Identidad, Enlaces rápidos, Información de contacto con redes sociales).

### 👥 2. Nosotros (`pages/nosotros.html`)
* **Diseño en 2 columnas:** Información y trayectoria histórica de la empresa a la izquierda, junto con una fotografía arquitectónica de alta calidad y un badge destacado de *"+15 Años de trayectoria"* a la derecha.
* **Tarjetas de Valores:** Confianza, Atención Personalizada y Excelencia.
* **Ubicación:** Mapa integrado de las oficinas centrales.

### 🏡 3. Detalle de Propiedad (`pages/verInmueble.html`)
* **Galería interactiva:** Visualizador modal de fotos con navegación por teclado y botones Anterior/Siguiente.
* **Ficha técnica completa:** Ambientes, baños, metros cuadrados, expensas y comodidades.
* **Acciones directas:** Guardar en favoritos, compartir en portapapeles y formulario de consulta específico del inmueble.
* **Propiedades Similares:** Carrusel / grilla de inmuebles relacionados con gestión de favoritos desacoplada.

### 👤 4. Portal del Cliente (`pages/cliente/misFavoritos.html`)
* **Vista 1 (Mis Favoritos):** Listado dinámico de propiedades guardadas con opción de alternar entre vista en grilla y lista, ordenamiento por precio y diálogo de confirmación para eliminar.
* **Vista 2 (Información de Contacto):** Formulario en 2 columnas para gestionar datos personales (nombre, email, teléfono, preferencia de contacto), contraseña y carga/previsualización de avatar de perfil con persistencia en `localStorage`.
* **Vista 3 (Alertas de Precio):** Algoritmo que calcula y muestra las 6 propiedades más económicas del catálogo con filtros dinámicos por *Todos*, *Alquiler* o *Venta*.

### 📊 5. Panel Administrativo (`pages/admin/panelAdmin.html`)
* **Dashboard:** Tarjetas con métricas comerciales en tiempo real y tabla de actividad reciente.
* **Gestión de Propiedades:** Tabla completa con columnas para Imagen, Título, **Tipo** (*Alquiler* / *Venta*), Precio, Estado y Acciones (editar, cambiar estado, eliminar).
* **Gestión de Clientes:** Tabla con listado de clientes registrados y consultas con opción de eliminación.
* **Configuración del Sistema:** Formulario en 2 columnas para administración de datos de la empresa.

---

## 3. Matriz de Cumplimiento de Requisitos Académicos

| Requisito Solicitado | Implementación en el Proyecto | Archivos de Referencia |
| :--- | :--- | :--- |
| **`index.html` con estructura semántica** | Estructura organizada con `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, y `<footer>`. | [index.html](file:///c:/wamp64/www/Negocios-Inmobiliarios/index.html) |
| **Menú de navegación con `ul`, `li` y `a`** | Menú accesible con lista desordenada y enlaces de navegación principal en el header. | Presente en todas las páginas |
| **Página principal + mín. 3 secundarias** | **5 páginas completadas** (`index.html`, `nosotros.html`, `verInmueble.html`, `panelAdmin.html`, `misFavoritos.html`). | Todo el árbol de directorios |
| **Enlaces entre las páginas** | Navegación relativa completa, interconectando el inicio, detalle, nosotros, admin y cuenta de cliente. | Todos los archivos HTML |
| **Al menos un marcador interno con `#`** | Marcadores internos como `#propiedades`, `#contacto`, `#destacadas`, `#servicios`. | [index.html](file:///c:/wamp64/www/Negocios-Inmobiliarios/index.html) |
| **Formularios con campos solicitados** | Formularios completos con `input` (texto, email, tel, password), `select`, `textarea`, botones de acción y validación. | `index.html`, `verInmueble.html`, `misFavoritos.html`, `panelAdmin.html` |
| **Tablas con `caption`, `th` y `td`** | Tablas estructuradas semánticamente con etiquetas `<caption>`, encabezados `<th>` con `scope="col"`, y celdas de datos `<td>`. | [panelAdmin.html](file:///c:/wamp64/www/Negocios-Inmobiliarios/pages/admin/panelAdmin.html) |
| **HTML validado W3C** | Código estricto con doctype `<!DOCTYPE html>`, atributos `alt` en todas las imágenes, `aria-labels` en controles interactivos y etiquetas correctamente cerradas. | Todos los archivos HTML |

---

## 4. Arquitectura de Estilos CSS3 (Parte D)

| Requisito CSS3 | Implementación Técnica | Ubicación |
| :--- | :--- | :--- |
| **`estilos.css` vinculado externamente** | Hojas de estilo externas vinculadas mediante `<link rel="stylesheet">`. | [style.css](file:///c:/wamp64/www/Negocios-Inmobiliarios/assets/styles/style.css) / [estilos.css](file:///c:/wamp64/www/Negocios-Inmobiliarios/assets/styles/estilos.css) |
| **Variables CSS en `:root`** | Sistema de diseño centralizado con tokens de color (`--navy-900`, `--gold-500`, `--white`), tipografía, sombras y radios de borde. | [style.css:L9-L46](file:///c:/wamp64/www/Negocios-Inmobiliarios/assets/styles/style.css#L9-L46) |
| **Selectores por etiqueta, clase, id y pseudo-clases** | - **Etiqueta:** `body`, `h1`, `p`, `a`, `img`, `table`<br>- **Clase:** `.property-card`, `.navbar`, `.btn-primary`<br>- **ID:** `#navbar`, `#propTableBody`, `#contactForm`<br>- **Pseudo-clases:** `:hover`, `:focus`, `:active`, `:disabled`, `:first-child`, `:nth-child` | En todos los archivos `.css` |
| **`box-sizing: border-box`** | Aplicado a todos los elementos mediante el reset universal `*, *::before, *::after`. | [style.css:L49-L55](file:///c:/wamp64/www/Negocios-Inmobiliarios/assets/styles/style.css#L49-L55) |
| **Diseño Responsive** | Grillas dinámicas con CSS Grid (`repeat(auto-fill, minmax(...))`) y componentes Flexbox adaptables. | Todo el sistema de estilos |
| **Unidades Relativas** | Utilización constante de `rem`, `em`, `%`, `vh`, `vw` y funciones CSS como `clamp()`. | En todos los módulos de estilo |
| **Flexbox** | Empleado en encabezados, barras de navegación, botones, alineación de tarjetas y pie de página. | En todos los módulos de estilo |
| **Media Queries (`@media`)** | Breakpoints definidos para escritorio, tablet y móvil (`max-width: 1024px`, `900px`, `768px`, `640px`). | En todos los archivos `.css` |
| **Imágenes con `max-width: 100%`** | Regla global `img { max-width: 100%; height: auto; display: block; }`. | [style.css:L71-L75](file:///c:/wamp64/www/Negocios-Inmobiliarios/assets/styles/style.css#L71-L75) |
| **Pruebas en múltiples pantallas** | Totalmente funcional y testeado tanto en resolución Desktop (1920x1080 / 1366x768) como en dispositivos móviles (375px - 480px). | Todas las vistas |

---

## 5. Características Destacadas y Valor Agregado

1. **Gestión de Favoritos en Tiempo Real:** Los clientes pueden marcar y desmarcar inmuebles desde la página principal, detalle o alertas, reflejándose instantáneamente en su cuenta.
2. **Sistema de Alertas Económicas:** Algoritmo que filtra y ordena en tiempo real las 6 opciones más accesibles del catálogo.
3. **Notificaciones Toast Modernas:** Avisos de confirmación limpios y profesionales (`✓ Guardado`, `✓ Enlace copiado`) sin uso de emojis.
4. **Diseño Visual Premium:** Paleta de colores sobria y elegante (*Navy* profundo, acentos en *Dorado* y fondos cálidos *Off-white*).
5. **Cero Dependencias Externas Pesadas:** Implementado íntegramente con tecnologías nativas web (HTML5, CSS3, JS Vanilla), garantizando máxima velocidad de carga.
