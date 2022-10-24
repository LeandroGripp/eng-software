import { Box, Flex, Text } from "@chakra-ui/react";

export default function SimpleFirstPage() {
  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box maxW='md' borderWidth='4px' borderRadius='xl' p="20px">
        Essa é somente uma pagina de teste :)
      </Box>
    </Flex>
  );
}