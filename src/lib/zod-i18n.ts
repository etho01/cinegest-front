// lib/zod-i18n.ts
import { z } from "zod";

// 2. Dire à Zod d’utiliser la errorMap i18n
z.config(z.locales.fr())

// (optionnel) export si tu veux typer/importer ton zod centralisé
export { z };
