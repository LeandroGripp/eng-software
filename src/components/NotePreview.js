import { Box, Flex, Text } from "@chakra-ui/react";


export default function NotePreview({ noteContent, toggleFavorite, ...rest }) {

  const { title, content} = noteContent;

  return (
    <Box shadow="lg" mt="20px" mr="20px" bg="orange.200" width="150px" height="150px" overflow="hidden" cursor="pointer" position="relative" {...rest}>
      <Flex direction="column" p="5px" align="flex-start" >
        <Text as='b'>{title}</Text>
        <Text fontSize="xs" textOverflow="ellipsis">{content}</Text>
      </Flex>
    </Box>
  );
}