import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Heading,
  HStack,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
import { BsFilter } from 'react-icons/bs'

function SearchFilters() {

  return (
    <Popover id="search-popover" placement="bottom-start">
      <PopoverTrigger>
        <Button leftIcon={<BsFilter />} h="1.75rem" variant="ghost">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* <PopoverCloseButton />
        <PopoverHeader>Filterss</PopoverHeader> */}
        <PopoverBody>
          <Heading as="h3" size="md">Tags</Heading>
          <HStack mt="5" spacing={4}>
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="gray"
            >
              <TagLabel>Slice Of Life</TagLabel>
              <TagCloseButton />
            </Tag>
        </HStack>
        <Heading mt="5" as="h3" size="md">JLPT</Heading>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default SearchFilters;
