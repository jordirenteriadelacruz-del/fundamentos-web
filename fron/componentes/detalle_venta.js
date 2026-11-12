// Ruta del endpoint 
const pathDetalleVenta = "/api/v1/ventas/1"; //  cambiar el 1 por el ID que yo quiera ver


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


async function renderDetalleVenta() {
    const body = document.querySelector("#table-body");
    if (!body) return;
    
    try {
        
        const venta = await api(pathDetalleVenta);
        
      
        body.replaceChildren();

     
        const detalles = venta.detalles || [];

        detalles.forEach(det => {
            const row = document.createElement("tr");

         
            [
                det.productoId, 
                det.nombreProducto || det.producto || "Producto", 
                det.cantidad, 
                det.precioUnitario, 
                det.subtotal || (det.cantidad * det.precioUnitario)
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error al cargar el detalle de la venta:", error);
    }
}


renderDetalleVenta();