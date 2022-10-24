import { Button, Container, Flex } from "@chakra-ui/react";
import { logout } from "../firebase";

export default function Dashboard() {
  return (
    <>
      <Flex width="100vw" height="100vh">
          <Container>
            <Button variant="solid" bg="red" color="white" onClick={logout} width="100%">Sair</Button>
          </Container>
      </Flex>
    </>
  );
}