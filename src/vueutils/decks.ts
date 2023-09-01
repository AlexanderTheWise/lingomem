import supabase from "@/lib/supabase";

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

export default { getDecks, deleteDeck, getTotalDecksPages };
