# 📋 Convención de Nomenclatura Redux

## Patrón Estándar

Para mantener consistencia en todo el proyecto, seguimos este patrón:

### 1. **Acciones Síncronas** (Action Creators)
Operaciones que solo modifican el estado local de Redux.

```javascript
// Español, verbos descriptivos
setClientes(clientes)
agregarCliente(cliente)
actualizarCliente(cliente)
eliminarCliente(id)
setCargando(boolean)
setError(error)
setFiltros(filtros)
limpiarFiltros()
```

### 2. **Acciones Asíncronas** (Thunks)
Operaciones que hacen llamadas a APIs.

```javascript
// Inglés, patrón REST
fetchClientes()           // GET - Obtener lista
createCliente(data)       // POST - Crear nuevo
updateCliente(data)       // PUT - Actualizar existente
deleteCliente(id)         // DELETE - Eliminar (soft delete)
activateCliente(id)       // POST - Activar
toggleActivoCliente(id)   // PATCH - Toggle estado
```

### 3. **Hooks Personalizados**
Los hooks exponen ambos tipos de acciones:

```javascript
const useClientes = () => {
    return {
        // Estado
        clientes,
        cargando,
        error,
        filtros,
        
        // Acciones síncronas (español)
        setClientes,
        agregarCliente,
        actualizarCliente,
        eliminarCliente,
        setCargando,
        setError,
        setFiltros,
        
        // Acciones asíncronas (inglés)
        fetchClientes,
        createCliente,
        updateCliente,
        deleteCliente,
        activateCliente,
        toggleActivoCliente
    };
};
```

---

## ✅ Ejemplos por Módulo

### **Clientes** ✅ CORRECTO

#### Actions:
```javascript
// Síncronas
setClientes(clientes)
agregarCliente(cliente)
actualizarCliente(cliente)
eliminarCliente(id)

// Asíncronas
fetchClientes()
createCliente(data)
updateCliente(data)
deleteCliente(id)
activateCliente(id)
toggleActivoCliente(id)
```

#### Hook:
```javascript
const {
    // Estado
    clientes,
    cargando,
    
    // Síncronas
    setClientes,
    agregarCliente,
    
    // Asíncronas
    fetchClientes,
    createCliente,
    updateCliente
} = useClientes();
```

---

### **Usuarios** ✅ CORRECTO

#### Actions:
```javascript
// Síncronas
setUsuarios(usuarios)
agregarUsuario(usuario)
actualizarUsuario(usuario)
eliminarUsuario(id)

// Asíncronas
fetchUsuarios()
createUsuario(data)
updateUsuario(data)
deleteUsuario(id)
```

---

### **Auditoría** ❌ NECESITA CORRECCIÓN

#### Estado Actual (INCORRECTO):
```javascript
// Asíncronas mezcladas
fetchAuditorias()                    // ✅ Correcto
fetchAuditoriasConFiltros(filtros)   // ❌ Muy largo
fetchAuditoriasUsuarios(filtros)     // ❌ Debería ser más corto
```

#### Estado Deseado (CORRECTO):
```javascript
// Síncronas
setAuditorias(auditorias)
setFiltros(filtros)
limpiarFiltros()

// Asíncronas
fetchAuditorias()              // Obtener todas
fetchAuditoriasByFilter(filtros) // Con filtros específicos
fetchUsuariosAuditoria(filtros)  // Auditorías de usuarios
```

---

## 🎯 Reglas Generales

### **Acciones Síncronas (Español)**
- ✅ `set[Entidad]` - Establecer lista completa
- ✅ `agregar[Entidad]` - Agregar uno a la lista
- ✅ `actualizar[Entidad]` - Actualizar uno en la lista
- ✅ `eliminar[Entidad]` - Remover uno de la lista
- ✅ `setCargando` - Estado de carga
- ✅ `setError` - Estado de error
- ✅ `setFiltros` - Filtros activos
- ✅ `limpiar[Algo]` - Resetear estado

### **Acciones Asíncronas (Inglés - REST)**
- ✅ `fetch[Entidad]` - GET obtener lista
- ✅ `fetch[Entidad]ById` - GET obtener uno
- ✅ `create[Entidad]` - POST crear nuevo
- ✅ `update[Entidad]` - PUT actualizar
- ✅ `delete[Entidad]` - DELETE eliminar
- ✅ `activate[Entidad]` - POST activar
- ✅ `toggle[Estado][Entidad]` - PATCH cambiar estado

### **Selectores**
- ✅ `select[Entidad]` - Lista completa
- ✅ `select[Entidad]Filtrados` - Lista filtrada
- ✅ `select[Entidad]Cargando` - Estado de carga
- ✅ `select[Entidad]Error` - Error
- ✅ `select[Entidad]Filtros` - Filtros activos
- ✅ `select[Entidad]Activos` - Solo activos

---

## 🚫 Anti-Patrones (Evitar)

### ❌ NO usar:
```javascript
// Mezclando idiomas
crearCliente()        // Debería ser createCliente()
editarCliente()       // Debería ser updateCliente()
eliminarClienteById() // Debería ser deleteCliente()
activarCliente()      // Debería ser activateCliente()

// Nombres muy largos
fetchAuditoriasConFiltros()  // Debería ser fetchAuditoriasByFilter()
obtenerClientesPorEstado()   // Debería ser fetchClientesByStatus()

// Duplicados
agregarCliente() + createCliente()  // Usar solo createCliente para API
```

### ✅ SÍ usar:
```javascript
// Síncronas en español
agregarCliente(cliente)
actualizarCliente(cliente)

// Asíncronas en inglés
createCliente(data)
updateCliente(data)
```

---

## 📝 Checklist de Implementación

Para cada nuevo módulo:

- [ ] Acciones síncronas en español
- [ ] Thunks (asíncronas) en inglés
- [ ] Hook personalizado con ambos tipos
- [ ] Selectores con prefijo `select`
- [ ] Reducer manejando todas las acciones
- [ ] Exportación al objeto global `window`
- [ ] Documentación en este archivo

---

## 🔧 Módulos Actualizados

- ✅ **Clientes** - Totalmente consistente
- ✅ **Usuarios** - Totalmente consistente
- ⚠️ **Auditoría** - Necesita refactorización
- ✅ **Ventas** - Consistente
- ✅ **App** - Consistente
- ✅ **Auth** - Consistente

---

## 📚 Referencias

Ver ejemplos completos en:
- `/wwwroot/Scripts/Redux/Actions/clientesActions.jsx`
- `/wwwroot/Scripts/Redux/Hooks/index.jsx`
- `/wwwroot/Scripts/Pages/Clientes/ClientesList.jsx`
