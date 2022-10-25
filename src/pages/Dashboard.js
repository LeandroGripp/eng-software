import { Button, Container, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NotePreview from "../components/NotePreview";
import NoteModal from "../components/NoteModal";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNoteContent, setModalNoteContent] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);

  const fetchData = useCallback(async () => {
    const q = query(collection(db, "notes"), where("userId", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc => docs.push((doc.data()))));
    setNotes(docs);
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (modalNoteContent?.temp) {
      setModalNoteContent(undefined);
    }
  }, [modalNoteContent])

  async function createNote(noteContent) {
    const id = uuidv4();
    await setDoc(
      doc(db, "notes", id),
      {
        title: noteContent.title,
        content: noteContent.content,
        isFavorite: noteContent.isFavorite,
        userId: user.uid,
        createdAt: new Date(),
        id
      });
    await fetchData();
  }

  async function updateNote(noteContent) {
    await setDoc(
      doc(db, "notes", noteContent.id),
      {
        ...noteContent,
        title: noteContent.title,
        content: noteContent.content,
        isFavorite: noteContent.isFavorite,
      }
    );
    await fetchData();
  }

  function openModalForEditingNote(noteContent) {
    setModalNoteContent(noteContent);
    setModalOpen(true);
  }

  function openModalForCreatingNote() {
    setModalNoteContent(undefined);
    setModalOpen(true);
  }

  function closeModal() {
    setModalNoteContent({ title: "", content: "", isFavorite: false, temp: true });
    setModalOpen(false);
  }


  return (
    <>
      <Flex width="100vw" height="100vh">
        <Container bg="gray.200" maxWidth="100vw" minHeight="100vh" p="20px" >
          <Button variant="outline" color="gray.700" borderColor="gray.700" borderWidth="2px" onClick={openModalForCreatingNote} rightIcon={<AiOutlinePlus />}>Nova nota</Button>
          <Flex flexWrap="wrap">
            {notes?.map((noteContent) => <NotePreview noteContent={noteContent} onClick={() => openModalForEditingNote(noteContent)} />)}
          </Flex>
          <Button variant="solid" bg="red" color="white" onClick={logout} width="100%">Sair</Button>
        </Container>
      </Flex>
      <NoteModal noteContent={modalNoteContent === undefined ? undefined : modalNoteContent} isOpen={modalOpen} onClose={closeModal} onSubmit={modalNoteContent ? updateNote : createNote} />
    </>
  );
}