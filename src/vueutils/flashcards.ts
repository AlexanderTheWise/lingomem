import supabase from "@/lib/supabase";
import { getTotalPages } from "./decks";

async function getFlashcards(deckId: number, page: number) {
  const rangeTo = page * 3;

  const { data } = await supabase
    .from("flashcards")
    .select("id, question, answer, imageUrl")
    .eq("deck_id", deckId)
    .range(rangeTo - 3, rangeTo);

  return data;
}

async function deleteFlashcard(id: number) {
  await supabase.from("flashcards").delete().eq("id", id);
}

async function getTotalFlashcardsPages() {
  return await getTotalPages("flashcards");
}

export default { getTotalFlashcardsPages, getFlashcards, deleteFlashcard };
