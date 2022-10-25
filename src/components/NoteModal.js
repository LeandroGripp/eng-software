import { Button, CloseButton, Flex, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function NoteModal({ noteContent, isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState(noteContent?.title || "");
  const [content, setContent] = useState(noteContent?.content || "");

  console.log(noteContent)

  useEffect(() => {
    console.log('rodou')
    if (!noteContent) {
      setTitle("");
      setContent("");
      return
    }
    setTitle(noteContent.title);
    setContent(noteContent.content);

  }, [noteContent])

  useEffect(() => {
    console.log(title, content)
  }, [title, content])

  // console.log(noteContent);
  // console.log(onSubmit);

  async function submitHandler() {
    try {
      await onSubmit({ isFavorite: false, ...noteContent, title, content });
      onClose();
    } catch (error) {
      alert("Houve um erro!");
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between">
            Nova/Editar nota <CloseButton onClick={onClose} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Input placeholder="Título" mb="20px" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Conteúdo da nota" mb="20px" value={content} onChange={(e) => setContent(e.target.value)} />
          <Flex justify="flex-end">
            <Button bg="orange.200" variant="solid" mb="15px" type="submit" onClick={submitHandler}>Salvar</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}