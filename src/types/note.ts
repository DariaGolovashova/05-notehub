export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createAt: string;
  updateAt: string;
}
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
