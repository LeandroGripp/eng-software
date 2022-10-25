import { Box, Flex, Text } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box maxW='md' borderWidth='4px' borderRadius='xl' p="20px">
        <Text fontSize='6xl' textAlign="center">404</Text>
        <Text fontSize='3xl' textAlign="center">A página que você buscou não foi encontrada</Text>
      </Box>
    </Flex>
  );
}