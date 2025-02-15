import { supabase } from "@/config/supabaseClient";

export function getImageUrl(fileName: string): string {
  return supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
} 