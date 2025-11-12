"use strict";

/**
 * Utilidades para trabajar con JWT (JSON Web Tokens)
 * Usa la librería jwt-decode para decodificar tokens de forma segura
 */
var JwtUtils = {
  /**
   * Decodifica un token JWT usando la librería jwt-decode
   * @param {string} token - El token JWT
   * @returns {object|null} - El payload decodificado o null si hay error
   */
  decodeToken: function decodeToken(token) {
    try {
      if (!token) {
        console.warn('⚠️ Token vacío o null');
        return null;
      }

      // Verificar que jwt_decode esté disponible
      if (typeof jwt_decode === 'undefined') {
        console.error('❌ jwt-decode library no está cargada');
        return null;
      }

      // Decodificar usando la librería jwt-decode
      var payload = jwt_decode(token);
      return payload;
    } catch (error) {
      console.error('❌ Error al decodificar token JWT:', error);
      return null;
    }
  },
  /**
   * Obtiene el rol del usuario desde el token JWT
   * @param {string} token - El token JWT
   * @returns {string|null} - El rol del usuario o null si no se encuentra
   */
  getRoleFromToken: function getRoleFromToken(token) {
    var payload = this.decodeToken(token);
    if (!payload) {
      console.warn('⚠️ No se pudo decodificar el token para obtener el rol');
      return null;
    }

    // El rol puede venir en diferentes claims según la configuración del servidor
    // ASP.NET Core usa 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    var role = payload.role || payload.Role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.roles && payload.roles[0] || payload.Roles && payload.Roles[0];
    console.log('🔍 Rol extraído del token:', role);
    console.log('📦 Payload completo del token:', payload);
    return role || null;
  },
  /**
   * Obtiene el nombre de usuario desde el token JWT
   * @param {string} token - El token JWT
   * @returns {string|null} - El nombre de usuario o null si no se encuentra
   */
  getUserNameFromToken: function getUserNameFromToken(token) {
    var payload = this.decodeToken(token);
    if (!payload) return null;

    // El nombre de usuario puede venir en diferentes claims
    var userName = payload.sub || payload.unique_name || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.name || payload.userName;
    return userName || null;
  },
  /**
   * Verifica si un token está expirado
   * @param {string} token - El token JWT
   * @returns {boolean} - true si está expirado, false si no
   */
  isTokenExpired: function isTokenExpired(token) {
    var payload = this.decodeToken(token);
    if (!payload || !payload.exp) {
      console.warn('⚠️ Token no tiene fecha de expiración');
      return true;
    }

    // exp viene en segundos, Date.now() en milisegundos
    var expirationTime = payload.exp * 1000;
    var currentTime = Date.now();
    var isExpired = currentTime >= expirationTime;
    if (isExpired) {
      console.warn('⚠️ Token expirado. Expiró en:', new Date(expirationTime));
    }
    return isExpired;
  },
  /**
   * Obtiene información completa del token
   * @param {string} token - El token JWT
   * @returns {object|null} - Objeto con información del token
   */
  getTokenInfo: function getTokenInfo(token) {
    var payload = this.decodeToken(token);
    if (!payload) return null;
    var info = {
      userName: this.getUserNameFromToken(token),
      role: this.getRoleFromToken(token),
      isExpired: this.isTokenExpired(token),
      expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
      issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
      issuer: payload.iss || null,
      audience: payload.aud || null,
      payload: payload
    };
    console.log('ℹ️ Información del token:', info);
    return info;
  },
  /**
   * Valida que el token sea válido y no esté expirado
   * @param {string} token - El token JWT
   * @returns {boolean} - true si es válido, false si no
   */
  isValidToken: function isValidToken(token) {
    if (!token) return false;
    var payload = this.decodeToken(token);
    if (!payload) return false;
    if (this.isTokenExpired(token)) {
      console.warn('⚠️ Token expirado');
      return false;
    }
    return true;
  }
};

// Hacer disponible globalmente
window.JwtUtils = JwtUtils;
console.log('🔐 JWT Utils loaded (using jwt-decode library)');

// Verificar que jwt-decode esté disponible
if (typeof jwt_decode === 'undefined') {
  console.error('❌ ADVERTENCIA: jwt-decode library no está cargada. Asegúrate de incluir el script antes de JwtUtils.js');
} else {
  console.log('✅ jwt-decode library detectada correctamente');
}