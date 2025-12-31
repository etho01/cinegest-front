/**
 * Configuration centralisée de l'API
 * Centralise les URLs et valide leur présence au démarrage
 */

export const API_CONFIG = {
    baseUrl: process.env.API_URL || '',
    referer: process.env.ENV_REFERER,
} as const;

/**
 * Valide que toutes les variables d'environnement requises sont présentes
 * @throws {Error} Si une variable requise est manquante
 */
export function validateApiConfig(): void {
    if (!API_CONFIG.baseUrl) {
        throw new Error(
            'API_URL environment variable is not configured. ' +
            'Please set API_URL in your .env file.'
        );
    }
}

/**
 * Construit une URL complète pour l'API
 * @param path - Le chemin relatif de l'endpoint (ex: "api/app/entity/1/cinemas")
 * @returns L'URL complète
 */
export function buildApiUrl(path: string): string {
    const baseUrl = API_CONFIG.baseUrl.endsWith('/') 
        ? API_CONFIG.baseUrl.slice(0, -1) 
        : API_CONFIG.baseUrl;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}/${cleanPath}`;
}
