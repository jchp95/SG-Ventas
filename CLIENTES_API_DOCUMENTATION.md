# API de Clientes - Documentación

## Endpoints Disponibles

### 1. Crear Cliente
**POST** `/api/cliente/crear`

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "cedulaRnc": "001-1234567-8",
  "telefono": "809-555-1234",
  "celular": "829-555-5678",
  "direccion": "Calle Principal #123",
  "fechaNacimiento": "1990-05-15",
  "tipoEntidad": "F",
  "calle": "Calle Principal",
  "limiteCredito": 50000.00,
  "ubicacionGps": "18.4861,-69.9312",
  "idRuta": 1,
  "idEstadoCivil": 1,
  "idSector": 1,
  "idMunicipio": 1,
  "idCiudad": 1,
  "idProvincia": 1,
  "idPais": 1,
  "idNacionalidad": 1,
  "idTipoCliente": 1,
  "idActividadComercial": 1,
  "idMoneda": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cliente creado exitosamente",
  "data": {
    "fidCliente": 1,
    "fnumeroCliente": 1,
    "fcedulaRnc": "001-1234567-8",
    "fnombre": "Juan Pérez",
    // ... más campos
    "factivo": true
  }
}
```

### 2. Listar Clientes
**GET** `/api/cliente/listar`

**Response:**
```json
{
  "success": true,
  "message": "Clientes obtenidos exitosamente",
  "data": [
    {
      "fidCliente": 1,
      "fnumeroCliente": 1,
      "fcedulaRnc": "001-1234567-8",
      "fnombre": "Juan Pérez",
      // ... más campos
      "factivo": true
    }
  ]
}
```

### 3. Obtener Cliente por ID
**GET** `/api/cliente/{id}`

**Response:**
```json
{
  "success": true,
  "message": "Cliente obtenido exitosamente",
  "data": {
    "fidCliente": 1,
    // ... campos del cliente
  }
}
```

### 4. Actualizar Cliente
**PUT** `/api/cliente/actualizar`

**Request Body:**
```json
{
  "idCliente": 1,
  "nombre": "Juan Pérez Actualizado",
  "cedulaRnc": "001-1234567-8",
  "telefono": "809-555-1234",
  // ... más campos
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cliente actualizado exitosamente",
  "data": {
    "fidCliente": 1,
    // ... campos actualizados
  }
}
```

### 5. Eliminar Cliente (Soft Delete)
**DELETE** `/api/cliente/eliminar/{id}`

**Response:**
```json
{
  "success": true,
  "message": "Cliente desactivado exitosamente",
  "data": true
}
```

### 6. Activar Cliente
**POST** `/api/cliente/activar/{id}`

**Response:**
```json
{
  "success": true,
  "message": "Cliente activado exitosamente",
  "data": true
}
```

### 7. Toggle Estado Activo
**PATCH** `/api/cliente/toggle-activo/{id}`

**Response:**
```json
{
  "success": true,
  "message": "Cliente activado/desactivado exitosamente",
  "data": true
}
```

## Características Implementadas

### 1. Multi-Tenancy
- ✅ Los clientes se almacenan en la base de datos del **tenant** (no en la central)
- ✅ Cada cliente está asociado a una empresa específica (`FkidEmpresa`)
- ✅ Solo se pueden ver y modificar clientes de la empresa del usuario actual
- ✅ El middleware `TenantMiddleware` establece el contexto de empresa

### 2. Seguridad
- ✅ Todos los endpoints requieren autenticación JWT (`[Authorize]`)
- ✅ Los clientes solo son accesibles por usuarios de su misma empresa
- ✅ Validación de cédula/RNC única por tenant
- ✅ El usuario que crea el cliente se registra en `FkidUsuario`

### 3. Validaciones
- ✅ Nombre es requerido (máx 50 caracteres)
- ✅ Cédula/RNC única por empresa (máx 20 caracteres)
- ✅ Tipo de entidad requerido (F=Física, J=Jurídica)
- ✅ Validación de campos opcionales con límites de longitud
- ✅ Manejo de errores con mensajes descriptivos

### 4. Auditoría
- ✅ Registro del usuario que crea el cliente
- ✅ Logs detallados de todas las operaciones
- ✅ Soft delete (marcado como inactivo, no eliminación física)

### 5. Auto-incremento
- ✅ Número de cliente se genera automáticamente por empresa
- ✅ Cada empresa tiene su propia secuencia de números de cliente

## Estructura de Archivos Creados

```
Controllers/
  └─ Cliente/
      └─ ClienteController.cs        ✅ Controlador API

Interfaces/
  └─ Cliente/
      └─ IClienteService.cs          ✅ Interfaz del servicio

Services/
  └─ Cliente/
      └─ ClienteService.cs           ✅ Lógica de negocio

ViewModels/
  └─ Cliente/
      ├─ CreateClienteRequest.cs     ✅ DTO para crear
      ├─ UpdateClienteRequest.cs     ✅ DTO para actualizar
      └─ ClienteResponse.cs          ✅ DTO de respuesta

Models/
  └─ ModelsBdTenant/
      └─ TbCliente.cs                ✅ Ya existía (modelo de BD)
```

## Configuración en Program.cs

```csharp
// Importaciones agregadas
using ventas.Interfaces.Cliente;
using ventas.Services.Cliente;

// Servicio registrado
builder.Services.AddScoped<IClienteService, ClienteService>();
```

## Uso desde el Frontend (Redux)

El frontend ya está configurado para consumir estos endpoints:

```javascript
// En clientesActions.jsx
export const fetchClientes = () => async (dispatch) => {
    dispatch(setClientesCargando(true));
    try {
        const response = await fetch('/api/cliente/listar', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            dispatch(setClientes(data.data));
        }
    } catch (error) {
        dispatch(setClientesError(error.message));
    } finally {
        dispatch(setClientesCargando(false));
    }
};
```

## Próximos Pasos

1. **Testing:** Probar todos los endpoints con datos reales
2. **Validaciones adicionales:** Agregar validaciones de negocio específicas
3. **Reportes:** Implementar endpoints para reportes de clientes
4. **Búsqueda avanzada:** Filtros por tipo de cliente, actividad comercial, etc.
5. **Exportación:** Exportar lista de clientes a Excel/PDF
6. **Integración con módulos:** Conectar con módulos de ventas, cuentas por cobrar, etc.

## Notas Importantes

- Los clientes se crean en la base de datos del **tenant**, no en la central
- Cada usuario solo puede ver clientes de su empresa
- El campo `FnumeroCliente` se genera automáticamente
- Los campos de relaciones (rutas, sectores, etc.) son opcionales
- El estado `Factivo` permite hacer soft delete
- Todos los logs se registran en `/Logs/log-{fecha}.txt`
