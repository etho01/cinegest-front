import { CalendarDate, CalendarDateTime, ZonedDateTime, parseDate, parseDateTime, parseZonedDateTime } from "@internationalized/date";

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime | null;

/**
 * Convertit un objet Date JavaScript en CalendarDateTime
 * Préserve le fuseau horaire local pour éviter les décalages
 */
export function dateToCalendarDateTime(date: Date): CalendarDateTime {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() retourne 0-11, on veut 1-12
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    
    return new CalendarDateTime(year, month, day, hour, minute, second);
}

/**
 * Convertit un objet Date JavaScript en CalendarDate (sans heure)
 * Préserve le fuseau horaire local pour éviter les décalages
 */
export function dateToCalendarDate(date: Date): CalendarDate {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() retourne 0-11, on veut 1-12
    const day = date.getDate();
    
    return new CalendarDate(year, month, day);
}

/**
 * Convertit un CalendarDateTime/CalendarDate en objet Date JavaScript
 */
export function calendarToDate(calendar: DateValue): Date {
    if (!calendar) {
        throw new Error("calendarToDate: calendar value is null");
    }
    if (calendar instanceof ZonedDateTime) {
        return calendar.toDate();
    }
    
    if ('hour' in calendar) {
        // CalendarDateTime
        return new Date(calendar.year, calendar.month - 1, calendar.day, calendar.hour, calendar.minute, calendar.second);
    } else {
        // CalendarDate
        return new Date(calendar.year, calendar.month - 1, calendar.day);
    }
}

/**
 * Convertit une chaîne ISO en CalendarDateTime
 * Attention: cette fonction ne gère pas les fuseaux horaires.
 * Utilisez isoStringToZonedDateTime si vous avez des informations de fuseau horaire
 */
export function isoStringToCalendarDateTime(isoString: string): CalendarDateTime {
    return parseDateTime(isoString.slice(0, 19));
}

/**
 * Convertit une chaîne ISO complète en ZonedDateTime
 * Recommandé pour préserver les informations de fuseau horaire
 */
export function isoStringToZonedDateTime(isoString: string): ZonedDateTime {
    return parseZonedDateTime(isoString);
}

/**
 * Convertit une chaîne ISO en CalendarDate
 */
export function isoStringToCalendarDate(isoString: string): CalendarDate {
    return parseDate(isoString.slice(0, 10));
}

/**
 * Formate un DateValue en chaîne lisible
 */
export function formatDateValue(dateValue: DateValue, locale: string = 'fr-FR'): string {
    if (!dateValue) return '';
    
    const date = calendarToDate(dateValue);
    
    if ('hour' in dateValue) {
        // Avec heure
        return date.toLocaleString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else {
        // Date seule
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
}

/**
 * Crée un CalendarDateTime pour "maintenant"
 */
export function now(): CalendarDateTime {
    return dateToCalendarDateTime(new Date());
}

/**
 * Crée un CalendarDate pour "aujourd'hui"
 */
export function today(): CalendarDate {
    return dateToCalendarDate(new Date());
}

/**
 * Convertit un objet Date JavaScript en ZonedDateTime avec fuseau horaire local
 * Recommandé pour éviter les problèmes de fuseau horaire
 */
export function dateToZonedDateTime(date: Date, timeZone?: string): ZonedDateTime {
    const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    return parseZonedDateTime(date.toISOString().replace('Z', `[${tz}]`));
}

/**
 * Crée un ZonedDateTime pour "maintenant" avec fuseau horaire local
 * Recommandé pour éviter les problèmes de fuseau horaire
 */
export function nowZoned(timeZone?: string): ZonedDateTime {
    return dateToZonedDateTime(new Date(), timeZone);
}

/**
 * Convertit une valeur DateValue vers une Date JavaScript en préservant le fuseau horaire
 * Cette fonction gère correctement les ZonedDateTime pour éviter les décalages
 */
export function dateValueToDate(dateValue: DateValue): Date {
    if (!dateValue) {
        throw new Error("dateValueToDate: dateValue is null");
    }
    
    // Si c'est un ZonedDateTime, utiliser sa méthode native pour préserver le fuseau horaire
    if (dateValue instanceof ZonedDateTime) {
        return dateValue.toDate();
    }
    
    // Pour CalendarDateTime et CalendarDate, créer une date locale
    if ('hour' in dateValue) {
        // CalendarDateTime - créer une date locale
        return new Date(dateValue.year, dateValue.month - 1, dateValue.day, dateValue.hour, dateValue.minute, dateValue.second);
    } else {
        // CalendarDate - créer une date locale à minuit
        return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
    }
}

/**
 * Fonction recommandée pour créer des DateValue avec fuseau horaire approprié
 * Évite les problèmes de décalage horaire en utilisant ZonedDateTime
 */
export function createSafeDateValue(date: Date, granularity: "day" | "hour" | "minute" | "second" = "minute"): DateValue {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (granularity === "day") {
        return dateToCalendarDate(date);
    } else {
        // Pour les heures, utiliser ZonedDateTime pour éviter les problèmes de fuseau horaire
        return dateToZonedDateTime(date, timeZone);
    }
}