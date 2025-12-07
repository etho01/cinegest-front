import React, { useState } from 'react';
import { DateTimePicker } from './DateTimePicker';
import { DateValue, nowZoned, createSafeDateValue, formatDateValue } from '@/src/lib/DateTimePickerUtils';
import { getLocalTimeZone } from '@internationalized/date';

export const DateTimePickerTimezoneExample = () => {
    const [selectedDate, setSelectedDate] = useState<DateValue>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<DateValue>(null);
    
    // Exemple avec une date JavaScript existante (par exemple, depuis une API)
    const existingDate = new Date('2024-12-25T14:30:00'); // Date de Noël à 14h30
    const [convertedDate, setConvertedDate] = useState<DateValue>(
        createSafeDateValue(existingDate, "minute")
    );

    const handleDateChange = (value: DateValue) => {
        setSelectedDate(value);
    };

    const handleDateTimeChange = (value: DateValue) => {
        setSelectedDateTime(value);
    };

    return (
        <div className="space-y-6 p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">DateTimePicker - Gestion des fuseaux horaires</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800">✅ Corrections appliquées :</h3>
                <ul className="list-disc pl-5 text-yellow-700 mt-2">
                    <li>Utilisation du fuseau horaire local par défaut</li>
                    <li>Conversions corrigées pour éviter les décalages UTC</li>
                    <li>Support des ZonedDateTime pour une précision maximale</li>
                </ul>
            </div>

            {/* Date seule - pas de problème de fuseau horaire */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Date seule (pas de fuseau horaire)</h3>
                <DateTimePicker
                    label="Date de naissance"
                    placeholder="Sélectionnez une date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    granularity="day"
                    showMonthAndYearPickers={true}
                />
                {selectedDate && (
                    <div className="mt-2 text-sm">
                        <p className="text-green-600">✓ Aucun problème de fuseau horaire avec granularity="day"</p>
                        <p>Formaté : {formatDateValue(selectedDate)}</p>
                    </div>
                )}
            </div>

            {/* Date et heure avec ZonedDateTime */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Date et heure (avec fuseau horaire local)</h3>
                <DateTimePicker
                    label="Date et heure du rendez-vous"
                    placeholder="Sélectionnez date et heure"
                    value={selectedDateTime}
                    onChange={handleDateTimeChange}
                    granularity="minute"
                    hideTimeZone={false}  // Montre le fuseau horaire
                    hourCycle={24}
                />
                {selectedDateTime && (
                    <div className="mt-2 text-sm">
                        <p className="text-green-600">✓ Utilise ZonedDateTime pour préserver le fuseau horaire</p>
                        <p>Formaté : {formatDateValue(selectedDateTime)}</p>
                        <p className="text-gray-500">Fuseau horaire : {getLocalTimeZone()}</p>
                    </div>
                )}
            </div>

            {/* Exemple de conversion d'une date existante */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Conversion d'une date existante</h3>
                <DateTimePicker
                    label="Date convertie depuis Date JavaScript"
                    value={convertedDate}
                    onChange={setConvertedDate}
                    granularity="minute"
                    description="Date originale: 25/12/2024 14:30 (depuis new Date('2024-12-25T14:30:00'))"
                />
                {convertedDate && (
                    <div className="mt-2 text-sm">
                        <p className="text-green-600">✓ Conversion sûre avec createSafeDateValue()</p>
                        <p>Date JavaScript originale : {existingDate.toLocaleString()}</p>
                        <p>Date convertie et formatée : {formatDateValue(convertedDate)}</p>
                    </div>
                )}
            </div>

            {/* Exemple avec nowZoned() */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Valeur par défaut "maintenant"</h3>
                <DateTimePicker
                    label="Date de création"
                    defaultValue={nowZoned()}  // Utilise nowZoned() au lieu de now()
                    granularity="minute"
                    description="Par défaut : maintenant avec fuseau horaire local"
                />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800">💡 Bonnes pratiques :</h3>
                <ul className="list-disc pl-5 text-blue-700 mt-2">
                    <li><code>createSafeDateValue()</code> pour convertir des Date JS</li>
                    <li><code>nowZoned()</code> au lieu de <code>now()</code> pour les valeurs par défaut</li>
                    <li><code>dateValueToDate()</code> pour convertir vers Date JS</li>
                    <li><code>granularity="day"</code> pour les dates sans heure (évite les fuseaux horaires)</li>
                    <li><code>hideTimeZone={`{false}`}</code> pour voir le fuseau horaire</li>
                </ul>
            </div>
        </div>
    );
};