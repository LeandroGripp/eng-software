import { Button, Container, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ImInfinite } from "react-icons/im";
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import NotePreview from "../components/NotePreview";
import NoteModal from "../components/NoteModal";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [notes, setNotes] = useState([]);
  const [showFavoriteOnly, setShowFavoriteOnly] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNoteContent, setModalNoteContent] = useState(undefined);
  const navigate = useNavigate();

  const favoritedNotes = notes.filter((note) => note.isFavorite);
  const notesToShow = showFavoriteOnly ? favoritedNotes : notes;



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

  function toggleFavorite(noteContent) {
    updateNote({
      ...noteContent,
      isFavorite: !noteContent.isFavorite
    });
  }

  return (
    <>
      <Flex width="100vw" height="100vh">
        <Flex width="320px" height="100%" shadow="lg" zIndex={2} direction="column" pt="10px" pb="20px">
          <Container>
            <Flex align="center">
              <Image src="book-logo.png" alt="Logo" boxSize="70px" />
              <Text>{user?.displayName}</Text>
            </Flex>
          </Container>
          <Container p={0}>
            <Button colorScheme="orange" variant="ghost" size="lg" justify="flex-start" w="100%" mt="20px" leftIcon={<ImInfinite />} onClick={() => setShowFavoriteOnly(false)}>Todas as notas</Button>
            <Button colorScheme="orange" variant="ghost" size="lg" justify="flex-start" w="100%" mt="0px" leftIcon={<AiFillStar />} onClick={() => setShowFavoriteOnly(true)}>Favoritas</Button>
          </Container>
          <Spacer />
          <Container>
            <Button variant="solid" bg="red" color="white" onClick={logout} width="100%">Sair</Button>
          </Container>
        </Flex>
        <Container bg="gray.200" maxWidth="100vw" minHeight="100vh" p="20px" >
          <Button variant="outline" color="gray.700" borderColor="gray.700" borderWidth="2px" onClick={openModalForCreatingNote} rightIcon={<AiOutlinePlus />}>Nova nota</Button>
          <Flex flexWrap="wrap">
            {notesToShow?.map((noteContent) => <NotePreview noteContent={noteContent} toggleFavorite={() => toggleFavorite(noteContent)} onClick={() => openModalForEditingNote(noteContent)} />)}
          </Flex>
        </Container>
      </Flex>

      <NoteModal noteContent={modalNoteContent === undefined ? undefined : modalNoteContent} isOpen={modalOpen} onClose={closeModal} onSubmit={modalNoteContent ? updateNote : createNote} />
    </>
  );
}