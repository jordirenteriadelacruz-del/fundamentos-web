 
const pathProductos = "/api/v1/productos";


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


async function renderProductos() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        
        const productos = await api(pathProductos);
        
  
        body.replaceChildren();

        
        productos.forEach(prod => {
            const row = document.createElement("tr");

            
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


renderProductos();