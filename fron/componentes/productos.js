// Ruta del endpoint para productos en tu backend
const pathProductos = "/api/v1/productos";

// Función genérica para hacer fetch a la API
async function api(path, options = {}) {
    const response = await fetch(path, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    const payload = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(payload?.error?.message || 'No fue posible completar la operación.');
    }
    return payload?.data;
}

// Función principal para renderizar los datos en la tabla
async function renderProductos() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        // Pide los datos reales al servidor backend (puerto 3001)
        const productos = await api(pathProductos);
        
        // Limpia la tabla antes de insertar nuevos datos
        body.replaceChildren();

        // Recorre cada producto y crea una fila (tr) con sus celdas (td)
        productos.forEach(prod => {
            const row = document.createElement("tr");

            // Aquí defines las columnas que quieres mostrar según tu JSON: nombre y precioCatalogo
            [prod.id, prod.nombre, prod.precioCatalogo].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Ejecuta la función al cargar el script
renderProductos();