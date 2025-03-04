import { supabase } from "@/config/supabaseClient";

export function getImageUrl(fileName: string) {
  if (!fileName) return;
  return supabase.storage.from("photo").getPublicUrl(fileName).data.publicUrl;
} 