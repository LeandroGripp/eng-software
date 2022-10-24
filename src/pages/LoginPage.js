import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // A página dashboard será criada em breve
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.200" direction="column">
      <Image src="full-logo.png" alt="Logo" mb="60px" />

      <Box maxW='md' borderWidth='4px' borderRadius='xl' borderColor="orange" p="20px" bg="orange.200">
        <Text fontSize='4xl' textAlign="center">Login</Text>
        <Button colorScheme="orange" variant="solid" size="lg" w="100%" mt="20px" rightIcon={<FaGoogle />} onClick={signInWithGoogle}>
          {loading ? <Spinner /> : "Login com Google"}</Button>
      </Box>
    </Flex>
  );
}