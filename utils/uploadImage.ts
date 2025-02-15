import { supabase } from "@/config/supabaseClient";

export async function uploadImage(file: File): Promise<string | null> {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from("images") 
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });
    if (error) {
        console.error("Upload unsuccessfully!", error.message);
        return null;
    }
    return fileName; 
}
