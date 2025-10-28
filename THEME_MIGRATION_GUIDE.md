# 🎨 Guía de Migración de Temas

## Resumen
Esta guía te muestra cómo actualizar los componentes existentes para que soporten el sistema de temas (claro/oscuro) usando Redux.

## 🔄 Componentes Ya Actualizados

### ✅ Navbar.jsx
- Convertido a componente funcional
- Usa Redux hooks para tema
- Botón de cambio de tema integrado
- Iconos Bootstrap Icons

### ✅ App.jsx  
- Envuelve la aplicación con Provider de Redux
- Aplica clases de tema al body
- Overlay de loading global
- Integración con componente Toasts

### ✅ Footer.jsx
- Convertido a componente funcional
- Responde automáticamente al tema
- Colores dinámicos según tema

### ✅ Sidebar.jsx
- Usa Redux hooks para tema
- Clases dinámicas según tema

### ✅ Home.jsx
- Convertido a componente funcional
- Usa Redux para tema y usuario
- Clases dinámicas aplicadas

## 🛠️ Patrón para Actualizar Otros Componentes

### 1. Convertir a Componente Funcional (si es clase)

**ANTES:**
```jsx
class MiComponente extends React.Component {
    render() {
        return (
            <div className="mi-componente">
                {/* contenido */}
            </div>
        );
    }
}
```

**DESPUÉS:**
```jsx
const MiComponente = () => {
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();
    
    return (
        <div className={`mi-componente ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            {/* contenido */}
        </div>
    );
};
```

### 2. Agregar Clases Dinámicas de Tema

```jsx
// Para contenedores principales
<div className={`container ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>

// Para cards
<div className={`card ${tema === 'dark' ? 'theme-dark' : ''}`}>

// Para formularios
<input className={`form-control ${tema === 'dark' ? 'theme-dark' : ''}`} />

// Para texto
<span className={tema === 'dark' ? 'text-light' : 'text-dark'}>
```

### 3. Usar Hooks de Redux Disponibles

```jsx
const MiComponente = () => {
    // Hooks disponibles
    const { tema, setTema, usuario, sidebarAbierto, agregarNotificacion } = window.ReduxProvider.useApp();
    const { usuarios, cargando, agregarUsuario } = window.ReduxProvider.useUsuarios();
    const { ventas, agregarVenta } = window.ReduxProvider.useVentas();
    
    // Tu lógica aquí...
};
```

## 🎨 Clases CSS Disponibles

### Tema Oscuro
- `.theme-dark` - Aplica colores oscuros a un contenedor
- Automáticamente cambia:
  - Backgrounds a #2d2d2d
  - Texto a #ffffff  
  - Bordes a #404040
  - Cards, forms, tables, buttons, etc.

### Tema Claro (por defecto)
- `.theme-light` - Aplica colores claros (opcional)
- Usa los colores estándar de Bootstrap

## 📋 Lista de Componentes Pendientes

### 🔄 Para Actualizar:
- [ ] `TableUsers.jsx`
- [ ] `CreateUserModal.jsx`
- [ ] `Modal.jsx`
- [ ] `ChartHome.jsx`
- [ ] `ActividadesRecientes.jsx`
- [ ] `OffCanvas/*.jsx`
- [ ] `Settings.jsx`
- [ ] `UsersList.jsx`
- [ ] `Register.jsx`

### 🚀 Pasos Rápidos para Cada Componente:

1. **Agregar Redux hook:**
   ```jsx
   const { tema } = window.ReduxProvider.useApp();
   ```

2. **Agregar clase de tema al contenedor principal:**
   ```jsx
   <div className={`mi-contenedor ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
   ```

3. **Usar colores dinámicos cuando sea necesario:**
   ```jsx
   <span className={tema === 'dark' ? 'text-light' : 'text-dark'}>
   ```

4. **Transpilar con Babel:**
   ```bash
   npm run build-js
   ```

## 🎯 Resultado Final

Una vez completado, tendrás:
- ✅ Sistema de temas completo y funcional
- ✅ Botón de cambio en navbar con animaciones
- ✅ Todos los componentes respondiendo al tema
- ✅ Persistencia del tema en Redux
- ✅ Notificaciones de cambio de tema
- ✅ CSS optimizado para ambos temas

## 💡 Tips Adicionales

1. **Testing:** Prueba cada componente en ambos temas
2. **Performance:** Las clases CSS están optimizadas
3. **Consistency:** Usa siempre los mismo hooks de Redux
4. **Accessibility:** Los temas mantienen buen contraste
5. **Future:** Fácil agregar más temas (ej: tema azul, verde, etc.)
