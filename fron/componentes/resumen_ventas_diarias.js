const pathResumenDiario = "/api/v1/resumen/ventas-diarias?desde=2026-10-01&hasta=2026-11-30";

// Función genérica fetch integrada para asegurar la conexión
async function api(path, options = {}) {
    const response = await fetch(path, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
    });
    const payload = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(payload?.error?.message || 'No fue posible completar la solicitud');
    }
    return payload?.data;
}

async function renderResumen() {
    const body = document.querySelector("#table-body");
    if (!body) return;

    try {
        const resumen = await api(pathResumenDiario);
        body.replaceChildren();

        if (!resumen || !Array.isArray(resumen)) {
            console.warn("La API no devolvió un arreglo válido:", resumen);
            return;
        }

        resumen.forEach(item => {
            const row = document.createElement("tr");

            [
                item.fecha,
                item.cantidadVentas,
                item.unidadesVendidas,
                item.ingresos,
                item.ticketPromedio,
                item.ultimaActualizacion
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error al cargar el resumen:", error);
    }
}

renderResumen();