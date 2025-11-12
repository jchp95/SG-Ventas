"use strict";

/**
 * Constantes de roles del sistema
 * Estas constantes protegen los nombres de roles reales en el navegador
 */
var ROLE_CONSTANTS = {
  // Códigos encriptados para roles
  ADMIN_CODE: 'ADM_001',
  USER_CODE: 'USR_002',
  
  // Mapeo de roles reales a códigos (solo para uso interno)
  ROLE_MAPPING: {
    'Administrador': 'ADM_001',
    'Usuario': 'USR_002'
  },
  
  // Función para obtener el código del rol
  getRoleCode: function(roleName) {
    console.log('🔐 [RoleConstants] getRoleCode called with:', roleName);
    console.log('🔐 [RoleConstants] Available role mappings:', this.ROLE_MAPPING);
    var roleCode = this.ROLE_MAPPING[roleName] || this.USER_CODE;
    console.log('🔐 [RoleConstants] Mapped role code:', roleCode);
    return roleCode;
  },
  
  // Función para verificar si es administrador
  isAdmin: function(roleCode) {
    console.log('🔐 [RoleConstants] isAdmin check - roleCode:', roleCode, 'ADMIN_CODE:', this.ADMIN_CODE);
    var result = roleCode === this.ADMIN_CODE;
    console.log('🔐 [RoleConstants] isAdmin result:', result);
    return result;
  },
  
  // Función para verificar si es usuario común
  isUser: function(roleCode) {
    console.log('🔐 [RoleConstants] isUser check - roleCode:', roleCode, 'USER_CODE:', this.USER_CODE);
    var result = roleCode === this.USER_CODE;
    console.log('🔐 [RoleConstants] isUser result:', result);
    return result;
  },
  
  // Función para obtener el código desde el usuario
  getUserRoleCode: function(usuario) {
    console.log('🔐 [RoleConstants] getUserRoleCode called with usuario:', usuario);
    if (!usuario || !usuario.roles || usuario.roles.length === 0) {
      console.log('🔐 [RoleConstants] No roles found, using default USER_CODE');
      return this.USER_CODE;
    }
    var roleName = usuario.roles[0];
    console.log('🔐 [RoleConstants] First role name:', roleName);
    return this.getRoleCode(roleName);
  }
};

// Hacer disponible globalmente
window.RoleConstants = ROLE_CONSTANTS;
console.log('🔐 Role Constants loaded');
