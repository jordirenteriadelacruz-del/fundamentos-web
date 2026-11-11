// Ruta del endpoint para resumen de ventas diarias con un rango de fechas por defecto
const pathResumenDiario = "/api/v1/resumen/ventas-diarias?desde=2026-10-01&hasta=2026-11-30";

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

// Función principal para renderizar el resumen diario en la tabla
async function renderResumenDiario() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        // Pide los datos al servidor backend
        const resumen = await api(pathResumenDiario);
        
        // Limpia la tabla antes de insertar nuevos datos
        body.replaceChildren();

        // Recorre cada registro y crea una fila (tr) con sus celdas (td)
        resumen.forEach(item => {
            const row = document.createElement("tr");

            // Mapeamos las propiedades exactas que vienen en tu JSON
            [
                item.fecha, 
                item.cantidadVentas, 
                item.unidadesVendidas, 
                item.ingresos, 
                item.ticketPromedio, 
                item.ultimaActualizacion
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error al cargar el resumen diario:", error);
    }
}

// Ejecuta la función al cargar el script
renderResumenDiario();