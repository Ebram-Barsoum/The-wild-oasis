import supabase from "./supabase";
import { getToday } from "../utils/helper.js";

import { RESULTS_PER_PAGE } from "../ui/Pagination.jsx";

export async function getBookings({ filter, sortBy, page }) {
    let query = supabase
        .from("bookings")
        .select(
            "id,created_at, startDate, endDate,numNights,numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
            { count: "exact" }
        );

    // FILTERING
    if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

    // SORTING
    if (sortBy)
        query.order(sortBy.sortField, { ascending: sortBy.direction === "asc" });

    // PAGINATION
    if (page) {
        const from = (page - 1) * RESULTS_PER_PAGE;
        const to = page * RESULTS_PER_PAGE - 1;
        query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) {
        throw new Error("Bookings couldn't be loaded");
    }

    return { bookings: data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id);

    if (error) {
        throw new Error("Booking Could'nt be loaded");
    }

    return { data: data[0] };
}

export async function updateBooking(id, updates) {
    const { data, error } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error("Booking couldn't be updated");
    }

    return { data };
}

export async function deleteBooking(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {

        throw new Error(`Booking #${id} couldn't be deleted`);
    }
}

export async function getBookingsAfter(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extraPrice")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        throw new Error("Booking couldn't be loaded");
    }

    return data;
}

export async function getStaysAfter(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday({ end: true }));

    if (error) {
        throw new Error("Booking couldn't be loaded");
    }

    return data;
}

export async function getTodayActivities() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        ).order('created_at');

    if (error) {
        throw new Error('Couldn\'t load today\'s activites');
    }

    return data;
}
