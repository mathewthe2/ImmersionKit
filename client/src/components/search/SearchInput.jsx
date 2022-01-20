import { useState, useEffect, useRef, useContext } from "react";
import useDelay from "hooks/common/useDelay";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import SearchFilters from "./SearchFilters";
import SearchContext from "context/search/SearchContext";
const INPUT_DELAY = 800;
const SPINNER_DELAY = 300;

function SearchInput({ updateSearchKeyword, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [isShowSpinner] = useDelay([isLoading, SPINNER_DELAY, false]);
  const inputRef = useRef();
  const router = useRouter();
  const { updateRouter } = useContext(SearchContext);

  const keyword = router.query.keyword ? decodeURIComponent(router.query.keyword) : '';

  // Focus on input element upon landing
  useEffect(() => {
    if (inputValue === "") {
      inputRef.current.focus();
    }
  }, [inputValue]);

  useEffect(()=> {
    if (keyword) {
      if (keyword.length > 0) {
        setInputValue(keyword);
        updateSearchKeyword(keyword);
      }
    }
  }, [keyword])

  const searchKeyword = (keyword) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        updateSearchKeyword(keyword);
        updateRouter({'keyword': keyword});
      }, INPUT_DELAY)
    );
  };

  const onChangeSearch = async (event) => {
    const { value } = event.target;
    setInputValue(value);
    searchKeyword(value);
  };

  return (
    <Box>
      <InputGroup>
        <InputLeftElement color="gray.500">
          {isShowSpinner ? (
            <Spinner color="purple.300" />
          ) : (
            <FiSearch size="20" />
          )}
        </InputLeftElement>
        <Input
          focusBorderColor="gray.400"
          ref={inputRef}
          pr="8rem"
          onChange={onChangeSearch}
          value={inputValue}
          placeholder="English, Japanese, Romaji, or words"
        />
        <InputRightElement width="8rem">
          {/* <Button leftIcon={<BsFilter />} h="1.75rem" variant="ghost">
                    Filters
                    </Button> */}
          <SearchFilters />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default SearchInput;
