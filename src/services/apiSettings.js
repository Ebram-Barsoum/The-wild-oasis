import toast from 'react-hot-toast';
import supabase from './supabase';
export async function getSettings() {
    let { data: settings, error } = await supabase
        .from('settings')
        .select('*').single();

    if (error) {
        toast.error("Couldn't fetch settings");
    }

    return settings;
}

export async function updateSettings(newSettings) {
    // we only have on row settings in our databse
    const SETTING_ROW_ID = 1;
    const { data, error } = await supabase
        .from('settings')
        .update({ ...newSettings })
        .eq("id", SETTING_ROW_ID)
        .select();

    if (error) {
        throw new Error("Couldn't update settings");
    }

    return data;
}