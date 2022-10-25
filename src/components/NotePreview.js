import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


export default function NotePreview({ noteContent, toggleFavorite, ...rest }) {

  const { title, content, isFavorite } = noteContent;

  return (
    <Box shadow="lg" mt="20px" mr="20px" bg="orange.200" width="150px" height="150px" overflow="hidden" cursor="pointer" position="relative" {...rest}>
      <Flex direction="column" p="5px" align="flex-start" >
        <Text as='b'>{title}</Text>
        <Text fontSize="xs" textOverflow="ellipsis">{content}</Text>
      </Flex>
      <Icon as={isFavorite ? AiFillStar : AiOutlineStar} position="absolute" p="5px" right="0px" top="0px" color="red.500" bg="orange.200" boxSize={8} onClick={(e) => { e.stopPropagation(); toggleFavorite() }} />
    </Box>
  );
}