import {
  useBreakpointValue,
  Button,
  ButtonGroup,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Spacer,
  Badge,
  Input,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FiSearch } from "react-icons/fi";
import NavItem from "components/common/NavItem";
import { useState, useRef, useContext } from "react";
import SearchContext from "context/search/SearchContext"
import { CATEGORIES_NAMES_MAP } from "lib/search/config";

function SelectWorkDrawer({
  total,
  selectedWorkName,
  workNamesAndCount,
  selectWork,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [innerFilterValue, setInnerFilterValue] = useState("");
  const viewport = useBreakpointValue({ base: "mobile", sm: "tablet" });
  const btnRef = useRef();
  const { category } = useContext(SearchContext);
  const categoryName = CATEGORIES_NAMES_MAP[category];

  const changeInputFilter = (event) => {
    setInnerFilterValue(event.target.value);
  };
  const onCloseDrawer = () => {
    onClose();
    setInnerFilterValue("");
  };
  const resetFilter = () => {
    selectWork("");
    if (isOpen) {
      onCloseDrawer();
    }
  };
  const truncateLength = viewport === "mobile" ? 12 : 20;
  const truncate = (input) => input.length > truncateLength ? `${input.substring(0, truncateLength)}...` : input;
  const hasWorkFilter = selectedWorkName !== "All";
  return (
    <>
      <ButtonGroup size="sm" maxW="60vw" isAttached variant="outline">
        <Button mr="-px" isTruncated ref={btnRef} onClick={onOpen}>
          {truncate(selectedWorkName)} ({total})
        </Button>
        {hasWorkFilter && (
          <IconButton
            onClick={resetFilter}
            aria-label="Reset Work Filter"
            icon={<SmallCloseIcon />}
          />
        )}
      </ButtonGroup>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onCloseDrawer}
        size="md"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{categoryName}</DrawerHeader>

          <DrawerBody>
            <InputGroup>
              <InputLeftElement color="gray.500">
                <FiSearch size="20" />
              </InputLeftElement>
              <Input
                value={innerFilterValue}
                onChange={changeInputFilter}
                placeholder={`Search ${categoryName}...`}
              />
            </InputGroup>
            <Box pt={2}>
              {workNamesAndCount
                .filter(([deckName, count]) =>
                  deckName
                    .toLowerCase()
                    .includes(innerFilterValue.toLowerCase())
                )
                .map(([deckName, count], index) => {
                  const isSelected = deckName === selectedWorkName;
                  return (
                    <NavItem
                      selected={isSelected}
                      key={`workNav_${index}`}
                      onClick={() => {
                        if (!isSelected) {
                          selectWork(deckName);
                          onCloseDrawer();
                        }
                      }}
                    >
                      <Flex w="100%">
                        <Box>{deckName}</Box>
                        <Spacer />
                        <Box>
                          <Badge>{count}</Badge>
                        </Box>
                      </Flex>
                    </NavItem>
                  );
                })}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseDrawer}>
              Close
            </Button>
            <Button
              disabled={!hasWorkFilter}
              onClick={resetFilter}
              colorScheme="purple"
            >
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SelectWorkDrawer;
