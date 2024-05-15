/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        throw new Error(error);
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        throw new Error("Cabin could not be deleted");
    }

    return data;
}

export async function addCabin(cabin) {
    // we use Math.random to make sure that the name is unique
    // we replace all / from the name cause if supabase found slash it creates folder

    // checking for in case of duplication so that the image is already generated
    const imageName =
        typeof cabin.image !== "string"
            ? `${Math.random()}-${cabin.image[0].name.replaceAll("/", "")}`
            : null;
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    // 1. Create a cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...cabin, image: imageName ? imageUrl : cabin.image, name: imageName ? cabin.name : `Copy of ${cabin.name}` }])
        .select();

    if (error) throw new Error("New Cabin Could not be added");

    // Not to upload the cabin image to supabase storage in case we're duplicating
    if (typeof cabin.image !== 'object' && cabin.image.startsWith(supabaseUrl)) return;

    // 2. Upload the image
    const { error: storageError } = await supabase.storage
        .from("cabins-images")
        .upload(imageName, cabin.image[0]);

    // 3. We will delete the cabin if an error occur in uploading the image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data[0].id);

        throw new Error(
            "Cabin image could't be uploaded and the cabin was deleted"
        );
    }

    return data;
}

export async function updateCabin(newCabin, cabinId, oldCabin) {
    const hasImagePath =
        typeof newCabin?.image !== "object" &&
        newCabin?.image?.startsWith(supabaseUrl);

    if (!hasImagePath) {
        var imageName = `${Math.random()}-${newCabin.image[0].name.replaceAll(
            "/",
            ""
        )}`;
        var imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
    }

    const { data, error } = await supabase
        .from("cabins")
        .update({ ...newCabin, image: !hasImagePath ? imageUrl : newCabin.image })
        .eq("id", cabinId);

    if (error) {
        throw new Error("Cabin couldn't be updated");
    }

    if (!hasImagePath) {
        const { error: storageError } = await supabase.storage
            .from("cabins-images")
            .upload(imageName, newCabin.image[0]);

        if (storageError) {
            await supabase
                .from("cabins")
                .update({ ...oldCabin })
                .eq("id", cabinId);

            throw new Error("Cabin image could't uploaded and cabin wasn't updated");
        }
    }

    return data;
}
