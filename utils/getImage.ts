import { supabase } from "@/config/supabaseClient";

export function getImageUrl(fileName: string) {
  return supabase.storage.from("photo").getPublicUrl(fileName).data.publicUrl;
} 