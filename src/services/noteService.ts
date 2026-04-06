import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNoteResponse {
  notes?: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNoteResponse> => {
  const { data } = await axios.get(BASE_URL, { params, headers });
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await axios.post(BASE_URL, note, { headers });
  return data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return data;
};
