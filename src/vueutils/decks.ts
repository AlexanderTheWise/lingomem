import supabase from "@/lib/supabase";
import type { DeckData, DeckToModify } from "@/types";

async function getDeck(deckId: string): Promise<DeckToModify> {
  const { data } = await supabase
    .from("decks")
    .select("name, description, imageUrl, id")
    .eq("id", deckId)
    .single();

  return data!;
}

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

export async function uploadImage(bucket_id: string, file: File) {
  const { data } = await supabase.storage
    .from(bucket_id)
    .upload(file.name, file);

  const {
    data: { publicUrl: imageUrl },
  } = await supabase.storage.from(bucket_id).getPublicUrl(data!.path);

  return imageUrl;
}

export async function modifyImage(bucket_id: string, path: string, file: File) {
  await supabase.storage.from(bucket_id).update(path, file);
  await supabase.storage.from(bucket_id).move(path, file.name);

  const {
    data: { publicUrl: imageUrl },
  } = await supabase.storage.from(bucket_id).getPublicUrl(file.name);

  return imageUrl;
}

async function addDeck({ file, ...rest }: DeckData) {
  const imageUrl = await uploadImage("decks", file);

  await supabase.from("decks").insert({ ...rest, imageUrl });
}

async function modifyDeck({
  file,
  path,
  id,
  ...rest
}: DeckData & { path: string; id: number }) {
  const imageUrl = await modifyImage("decks", path, file);

  await supabase
    .from("decks")
    .update({ ...rest, imageUrl })
    .eq("id", id);
}

export default {
  getDeck,
  getDecks,
  deleteDeck,
  getTotalDecksPages,
  addDeck,
  modifyDeck,
};
