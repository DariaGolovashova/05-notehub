import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
// import type { FetchNotesParams } from "../../services/noteService";
import type { Note, NoteTag } from "../../types/note";
import type { NoteFormValues } from "../NoteForm/NoteForm";

import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  // const { data, isLoading, isError } = useQuery(
  //   ["notes", page, search],
  //   () => fetchNotes({ page, perPage: 12, search }),
  //   { keepPreviousData: true },
  // );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      // setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // const handleCreate = (values: {
  //   title: string;
  //   content: string;
  //   tag: NoteTag;
  // }) => {
  //   createMutation.mutate(values);
  // };
  const handleCreate = (values: NoteFormValues) => {
    createMutation.mutate(
      values as Omit<Note, "id" | "createdAt" | "updatedAt">,
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={debouncedSearch} />
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            {" "}
            Create note +
          </button>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {data && data.totalPages > 1 && (
            <Pagination pageCount={data.totalPages} onPageChange={setPage} />
          )}
        </header>

        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} onDelete={handleDelete} />
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onSubmit={handleCreate}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
      {/* <section id="spacer"></section> */}
    </>
  );
}

export default App;
