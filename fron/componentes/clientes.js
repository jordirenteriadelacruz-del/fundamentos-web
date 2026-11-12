// ruta del endpoint
const pathClientes = "/api/v1/clientes";


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


async function renderClientes() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        
        const clientes = await api(pathClientes);
        
        
        body.replaceChildren();

       
        clientes.forEach(cli => {
            const row = document.createElement("tr");

           
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