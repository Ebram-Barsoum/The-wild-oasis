/* eslint-disable no-unused-vars */
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

// Email: abram@gmail.com PWD: pass1010
// Email: pewip66128@mfyax.com PWD: 12345678

export async function signIn({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return { data };
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return;

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return user;
}

export async function signOut() {
    let { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function signUp({ fullName, email, password }) {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return { data };
}

export async function updateUserData({ fullName, password, avatar }) {
    // 1- Update password or fullNama as each of them in a separate form
    let newData;
    if (password) newData = { password };
    if (fullName) newData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(newData);

    if (error) {
        throw new Error(error.message);
    }

    if (!avatar) return;

    // 2- Upload the avatar to supabase storage
    const avatarName = `avatar-${data?.user?.id}-${Math.random()}`;
    const { storageError } = await supabase.storage
        .from("avatars")
        .upload(avatarName, avatar);

    if (storageError) {
        throw new Error(storageError.message);
    }

    // 3-Update user with the new avatar
    newData = {
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
        },
    };

    const { data: updatedUser, error: updateError } =
        await supabase.auth.updateUser(newData);

    if (updateError) {
        throw new Error(updateError.message);
    }

    return updatedUser;
}
