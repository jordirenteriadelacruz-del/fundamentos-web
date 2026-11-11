// Ruta del endpoint para clientes en tu backend
const pathClientes = "/api/v1/clientes";

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

// Función principal para renderizar los clientes en la tabla
async function renderClientes() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        // Pide los datos reales al servidor backend (puerto 3001)
        const clientes = await api(pathClientes);
        
        // Limpia la tabla antes de insertar nuevos datos
        body.replaceChildren();

        // Recorre cada cliente y crea una fila (tr) con sus celdas (td)
        clientes.forEach(cli => {
            const row = document.createElement("tr");

            // Como solo tiene id y nombre, mapeamos esos dos valores
            [cli.id, cli.nombre].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// Ejecuta la función al cargar el script
renderClientes();