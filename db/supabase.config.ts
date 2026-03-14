import { createClient } from "@supabase/supabase-js";

/**
 * =========================================
 * SUPABASE CLIENT
 * =========================================
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * =========================================
 * GENERIC INSERT FUNCTION
 * =========================================
 */

export async function insertRow<T extends Record<string, unknown>>(
  table: string,
  row: T
) {
  const { data, error } = await supabase
    .from(table)
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
