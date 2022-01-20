import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import SearchContext from "context/search/SearchContext";
import SentenceContextCard from "./SentenceContextCard";
import SentenceContextList from "./SentenceContextList";

function SentenceContextDrawer({ isOpen, onOpen, onClose }) {
  // const fallbackColor = useColorModeValue("gray.100", "gray.900");
  const { selectedExample } = useContext(SearchContext);
  const scrollbarColor = useColorModeValue("gray", "white");

  return (
    <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{selectedExample?.source}</DrawerHeader>

        <DrawerBody>
          <Flex>
            <Box>
              <SentenceContextCard />
            </Box>
            <Box
              width="60%"
              maxH="420px"
              paddingRight="10px"
              overflowY="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '24px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: scrollbarColor,
                  borderRadius: '24px',
                },
              }}
            >
              <SentenceContextList />
            </Box>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          {/* <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button> */}
          {/* <Button colorScheme="blue">Save</Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SentenceContextDrawer;
