/**
 * Wrapper for Zoho Calendar API using Server-to-Server OAuth.
 * Requires ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN in .env
 */

const ZOHO_AUTH_URL = 'https://accounts.zoho.com/oauth/v2/token';
const ZOHO_CALENDAR_API_URL = 'https://calendar.zoho.com/api/v1/calendars';

// Función helper para obtener un nuevo Access Token de Zoho
async function getZohoAccessToken() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Faltan credenciales de Zoho en las variables de entorno (ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN)');
    }

    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'refresh_token');

    const response = await fetch(ZOHO_AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
        cache: 'no-store'
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error obteniendo access token de Zoho: ${errorData}`);
    }

    const data = await response.json();
    return data.access_token;
}

// Devuelve el ID del calendario principal
async function getPrimaryCalendarUID(accessToken: string) {
    const response = await fetch(ZOHO_CALENDAR_API_URL, {
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener lista de calendarios Zoho');
    }

    const data = await response.json();
    if (data.calendars && data.calendars.length > 0) {
        // En Zoho Calendar, habitualmente se busca el primer calendario
        return data.calendars[0].uid;
    }
    throw new Error('No se encontraron calendarios en esta cuenta de Zoho');
}

/**
 * Consulta la disponibilidad de una fecha
 */
export async function checkZohoCalendarAvailability(dateStr: string) {
    try {
        const token = await getZohoAccessToken();
        const uid = await getPrimaryCalendarUID(token);

        // Date param requires format yyyyMMdd
        // Vamos a retornar los eventos de ese día para que el modelo decida si hay huecos
        const formattedDate = dateStr.replace(/-/g, ''); // 2024-03-01 -> 20240301

        const url = `${ZOHO_CALENDAR_API_URL}/${uid}/events?date=${formattedDate}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            }
        });

        if (!response.ok) {
            return { error: 'No se pudo consultar el calendario', status: response.status };
        }

        const result = await response.json();

        if (!result.events || result.events.length === 0) {
            return { available: true, message: `El día ${dateStr} está completamente libre de eventos.` };
        }

        // Simplificar la salida para el bot (solo horarios ocupados)
        const busySlots = result.events.map((e: any) => ({
            title: 'Ocupado',
            start: e.dateandtime?.start || e.allday?.start,
            end: e.dateandtime?.end || e.allday?.end
        }));

        return {
            available: true,
            message: `El día ${dateStr} tiene horarios ocupados. Revisa los slots para ofrecer horarios libres. Asume horario de oficina 9am a 6pm.`,
            busySlots
        };

    } catch (err: any) {
        console.error('Zoho API Error:', err);
        return { error: err.message || 'Error desconocido' };
    }
}

/**
 * Crea un nuevo evento en Zoho Calendar
 */
export async function createZohoCalendarEvent(details: { title: string, startTime: string, endTime: string, attendeeEmail: string }) {
    try {
        const token = await getZohoAccessToken();
        const uid = await getPrimaryCalendarUID(token);

        // Zoho API para crear evento
        const url = `${ZOHO_CALENDAR_API_URL}/${uid}/events`;

        // El formato esperado para startTime y endTime es 'yyyyMMddTHHmmssZ'
        const formatZohoDate = (isoString: string) => {
            const date = new Date(isoString);
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const eventPayload = {
            title: details.title,
            dateandtime: {
                start: formatZohoDate(details.startTime),
                end: formatZohoDate(details.endTime),
                timezone: 'UTC'
            },
            attendees: [{
                email: details.attendeeEmail
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventdata: eventPayload })
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Zoho event creation failed: ${errBody}`);
        }

        const resData = await response.json();
        return { success: true, eventId: resData.events[0].uid };

    } catch (err: any) {
        console.error('Zoho Create Event Error:', err);
        return { success: false, error: err.message };
    }
}
