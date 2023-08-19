import { supabase } from "@/lib/supabase";
import type { UserCredentials } from "@/types";

export async function signUp(credentials: UserCredentials) {
  const { error } = await supabase.auth.signUp({ ...credentials });

  return error?.message;
}

export async function signIn(credentials: UserCredentials) {
  const { error } = await supabase.auth.signInWithPassword({
    ...credentials,
  });

  return error?.message;
}
