import supabase from "@/lib/supabase";
import type { UserCredentials } from "@/types";

async function signUp(credentials: UserCredentials) {
  const { error } = await supabase.auth.signUp({ ...credentials });

  return error?.message;
}

async function signIn(credentials: UserCredentials) {
  const { error } = await supabase.auth.signInWithPassword({
    ...credentials,
  });

  return error?.message;
}

async function signOut() {
  await supabase.auth.signOut();
}

export default { signIn, signUp, signOut };
