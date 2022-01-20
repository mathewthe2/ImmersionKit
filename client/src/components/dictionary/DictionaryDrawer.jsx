import {
    Button,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from "@chakra-ui/react"
import React from "react"
import { useState } from 'react'
import SentenceCards from "components/search/SentenceCards";
import useSearch from "hooks/search/useSearch";
import SentenceContextDrawer from "components/search/SentenceContextDrawer";
import SearchContext, { defaultState } from "context/search/SearchContext";

const searchTags = [];
const WaniKaniLevel = "";
const JLPTLevel = "";
const sorting="shortness";
const category = 'anime'

function DictionaryDrawer({isOpen, onOpen, onClose, searchKeyword}) {
  const {
    examples,
    dictionaryEntries,
    exactMatch,
    categoryCount,
    isLoading,
    isError,
  } = useSearch({
    keyword: searchKeyword,
    tags: searchTags,
    WaniKaniLevel,
    JLPTLevel,
    sorting,
    category,
  });
  const [selectedExample, setSelectedExample] = useState({});
  const {
    isOpen: isOpenSentenceContextDrawer,
    onOpen: onOpenSentenceContextDrawer,
    onClose: onCloseSentenceContextDrawer,
  } = useDisclosure();
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const btnRef = React.useRef()

    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{searchKeyword}</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder="Type here..." defaultValue={searchKeyword} /> */}
            <SearchContext.Provider
                value={{
                  category,
                  sentencesView: 'list',
                  exactMatch,
                  selectedExample,
                  setSelectedExample,
                  onOpenSentenceContextDrawer,
                }}
              >
            <SentenceCards isLoading={isLoading} examples={examples} />
            <SentenceContextDrawer
              isOpen={isOpenSentenceContextDrawer}
              onOpen={onOpenSentenceContextDrawer}
              onClose={onCloseSentenceContextDrawer}
            />
            </SearchContext.Provider>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}

export default DictionaryDrawer