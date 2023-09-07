import supabase from "@/lib/supabase";
import type { DeckData } from "@/types";

async function getDecks(page: number) {
  const rangeTo = page * 3;

  const { data } = await supabase
    .from("decks")
    .select("id, name, description, imageUrl")
    .range(rangeTo - 3, rangeTo);

  return data;
}

export async function getTotalPages(table: string) {
  const count = (await supabase.from(table).select("*", { count: "exact" }))
    .count;

  return Math.ceil(Number(count) / 4) || 1;
}

async function getTotalDecksPages() {
  return await getTotalPages("decks");
}

async function deleteDeck(id: number) {
  await supabase.from("decks").delete().eq("id", id);
}

async function addDeck({ file, ...rest }: DeckData) {
  const { data } = await supabase.storage.from("decks").upload(file.name, file);

  const {
    data: { publicUrl: imageUrl },
  } = await supabase.storage.from("decks").getPublicUrl(data!.path);

  await supabase.from("decks").insert({ ...rest, imageUrl });
}

export default { getDecks, deleteDeck, getTotalDecksPages, addDeck };
