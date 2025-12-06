import React, { useState } from 'react';
import { DateTimePicker } from './DateTimePicker';
import { DateValue, nowZoned, today } from '@/src/lib/DateTimePickerUtils';

export const DateTimePickerFormatExample = () => {
    const [selectedDate1, setSelectedDate1] = useState<DateValue>(null);
    const [selectedDate2, setSelectedDate2] = useState<DateValue>(null);
    const [selectedDate3, setSelectedDate3] = useState<DateValue>(null);
    const [selectedDate4, setSelectedDate4] = useState<DateValue>(null);

    return (
        <div className="space-y-6 p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Personnalisation de l'affichage des dates</h2>
            
            {/* Format français par défaut */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Format français (par défaut)</h3>
                <DateTimePicker
                    label="Date française"
                    value={selectedDate1}
                    onChange={setSelectedDate1}
                    locale="fr-FR"
                    granularity="day"
                />
            </div>

            {/* Format américain */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Format américain</h3>
                <DateTimePicker
                    label="Date américaine"
                    value={selectedDate2}
                    onChange={setSelectedDate2}
                    locale="en-US"
                    granularity="day"
                />
            </div>

            {/* Format allemand */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Format allemand</h3>
                <DateTimePicker
                    label="Date allemande"
                    value={selectedDate3}
                    onChange={setSelectedDate3}
                    locale="de-DE"
                    granularity="day"
                />
            </div>

            {/* DateTime avec locale */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Date et heure avec locale française</h3>
                <DateTimePicker
                    label="DateTime français"
                    value={selectedDate4}
                    onChange={setSelectedDate4}
                    locale="fr-FR"
                    granularity="minute"
                    hourCycle={24}
                />
            </div>

            {/* CSS personnalisé pour l'espacement */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Avec espacement personnalisé</h3>
                <style jsx>{`
                    .custom-date-picker :global(.react-aria-DateSegment) {
                        margin-right: 8px;
                    }
                    .custom-date-picker :global(.react-aria-DateSegment:not(:last-child))::after {
                        content: " ";
                        margin-left: 4px;
                    }
                `}</style>
                <div className="custom-date-picker">
                    <DateTimePicker
                        label="Date avec espacement"
                        defaultValue={today()}
                        locale="fr-FR"
                        granularity="minute"
                        className="custom-spacing"
                    />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800">💡 Options disponibles :</h3>
                <ul className="list-disc pl-5 text-blue-700 mt-2 space-y-1">
                    <li><code>locale="fr-FR"</code> - Format français (jj/mm/aaaa)</li>
                    <li><code>locale="en-US"</code> - Format américain (mm/jj/aaaa)</li>
                    <li><code>locale="de-DE"</code> - Format allemand (jj.mm.aaaa)</li>
                    <li><code>locale="en-GB"</code> - Format anglais (jj/mm/aaaa)</li>
                    <li><code>granularity="day"</code> - Date seule</li>
                    <li><code>granularity="minute"</code> - Date + heure:minute</li>
                    <li><code>hourCycle={12 | 24}</code> - Format 12h ou 24h</li>
                </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800">🎨 Pour l'espacement personnalisé :</h3>
                <pre className="text-sm text-yellow-700 mt-2 bg-yellow-100 p-2 rounded">
{`.custom-date-picker :global(.react-aria-DateSegment) {
    margin-right: 8px;
}

/* Ou avec Tailwind dans classNames */
classNames={{
    base: "[&_.react-aria-DateSegment]:mr-2"
}}`}
                </pre>
            </div>
        </div>
    );
};