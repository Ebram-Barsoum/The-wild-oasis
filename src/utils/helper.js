import { differenceInDays, formatDistance, parseISO } from "date-fns";

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function subtractDates(date1, date2) {
    return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
    const today = new Date();

    // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export function formatDistanceFromNow(dateStr) {
    return formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    }).replace('about', '').replace('in', 'In');
}

