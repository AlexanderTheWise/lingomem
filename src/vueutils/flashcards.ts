import supabase from "@/lib/supabase";
import { getTotalPages, modifyImage, uploadImage } from "./decks";
import type { Flashcard, FlashcardData, StudyCards } from "@/types";

async function getFlashcard(flashcardId: number): Promise<Flashcard> {
  const { data } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", flashcardId)
    .single();

  return data!;
}

async function getFlashcards(deckId: number, page: number) {
  const rangeTo = page * 3;

  const { data } = await supabase
    .from("flashcards")
    .select("id, question, answer, imageUrl, user_id, deck_id")
    .eq("deck_id", deckId)
    .range(rangeTo - 3, rangeTo);

  return data;
}

async function getFlashcardsToReview() {
  const now = new Date().toISOString();

  const { data } = await supabase
    .from("flashcards")
    .select("*")
    .lte("schedule_time", now)
    .order("schedule_time", { ascending: true })
    .returns<StudyCards>();

  return data!;
}

async function addFlashcard({
  file,
  ...rest
}: FlashcardData & { deck_id: number }) {
  const imageUrl = await uploadImage("flashcards", file);

  await supabase.from("flashcards").insert({ ...rest, imageUrl });
}

async function modifyFlashcard({
  file,
  path,
  id,
  ...rest
}: FlashcardData & { path: string; id: number }) {
  const imageUrl = await modifyImage("flashcards", path, file);

  await supabase
    .from("flashcards")
    .update({ ...rest, imageUrl })
    .eq("id", id);
}

async function deleteFlashcard(id: number, path: string) {
  await supabase.from("flashcards").delete().eq("id", id);
  await supabase.storage.from("flashcards").remove([path]);
}

async function getTotalFlashcardsPages() {
  return await getTotalPages("flashcards");
}

export default {
  getFlashcardsToReview,
  getTotalFlashcardsPages,
  getFlashcards,
  deleteFlashcard,
  addFlashcard,
  getFlashcard,
  modifyFlashcard,
};
