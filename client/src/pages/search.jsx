import React, { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import CategorySelect from "components/search/CategorySelect";
import SentenceCards from "components/search/SentenceCards";
import useSearch from "hooks/search/useSearch";
import SearchInput from "components/search/SearchInput";
import OrientationSwitch from "components/search/OrientationSwitch";
import EmptyResult from "components/search/SentenceCards/EmptyResult";
import getWorkNamesAndCount from "lib/search/getWorkNamesAndCount";
import filterExamples from "lib/search/filterExamples";
import SelectWorkDrawer from "components/search/SelectWorkDrawer";
import SentenceSortMenu from "components/search/SentenceSortMenu";
import SentenceContextDrawer from "components/search/SentenceContextDrawer";
import SearchContext, { defaultState } from "context/search/SearchContext";
import { useRouter } from "next/router";
import _ from 'lodash';

const searchTags = [];
const WaniKaniLevel = "";
const JLPTLevel = "";

function Search() {

  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sorting, setSorting] = useState('');
  const [sentencesView, setSentencesView] = useState(defaultState.sentencesView);
  const [sentencesFilter, setSentencesFilter] = useState({});
  const [selectedExample, setSelectedExample] = useState({});
  const {
    isOpen: isOpenSentenceContextDrawer,
    onOpen: onOpenSentenceContextDrawer,
    onClose: onCloseSentenceContextDrawer,
  } = useDisclosure();
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
    sorting: sorting,
    category,
  });
  const viewport = useBreakpointValue({ base: "mobile", sm: "tablet" });

  const updateRouter = (params) => {
    const currentQueryObject = {
      'keyword': searchKeyword,
      'sort': sorting,
      'jlpt': JLPTLevel,
      'wk': WaniKaniLevel
    } 
    const newQueryObject = _.extend(currentQueryObject, params)
    Object.keys(currentQueryObject).forEach(sortParam =>{
      if (newQueryObject[sortParam] == '' || newQueryObject[sortParam] == 'None' || newQueryObject[sortParam] == []) {
        delete newQueryObject[sortParam]
      }
    })
    const newSearchParams = new URLSearchParams(newQueryObject).toString();
    if (newSearchParams) {
      router.push(`/search?${newSearchParams}`, undefined, { shallow: true })
    } else {
      router.push(`/search`, undefined, { shallow: true })
    }
  }

  const updateCategory = (category) => {
    setSentencesFilter({});
    setCategory(category);
  };

  // inner filter by work name, refactor in the future
  const filteredExamples = filterExamples({
    examples,
    filterItem: sentencesFilter,
  });
  const filterByWork = (workName) => {
    if (workName === "") {
      setSentencesFilter({});
    } else {
      setSentencesFilter({ deck_name: workName });
    }
  };
  const hasFilterByWork = "deck_name" in sentencesFilter;
  const getSelectedWorkName = hasFilterByWork
    ? sentencesFilter["deck_name"]
    : "All";
  const workIndex = getWorkNamesAndCount(examples).findIndex(
    (item) => item[0] === sentencesFilter["deck_name"]
  );
  const getSelectedWorkCount = hasFilterByWork
    ? workIndex >= 0
      ? getWorkNamesAndCount(examples)[workIndex][1]
      : 0
    : examples.length;

  return (
    <SearchContext.Provider
      value={{
        category,
        sorting,
        sentencesView,
        exactMatch,
        selectedExample,
        setSelectedExample,
        updateRouter,
        onOpenSentenceContextDrawer,
      }}
    >
      <Box pb={5}>
        <Box pb={5}>
          <CategorySelect
            updateCategory={updateCategory}
            categoryCount={categoryCount}
          />
        </Box>
        <SearchInput
          updateSearchKeyword={setSearchKeyword}
          isLoading={isLoading}
        />

          <Flex wrap="wrap" hidden={searchKeyword.length === 0 || examples.length === 0}>
            <Box mt="5">
              <SelectWorkDrawer
                workNamesAndCount={getWorkNamesAndCount(examples)}
                selectWork={filterByWork}
                total={getSelectedWorkCount}
                selectedWorkName={getSelectedWorkName}
              />
            </Box>
            <Spacer />
            <Box mt="5">
              <SentenceSortMenu setSorting={setSorting} />
            </Box>
            {viewport !== "mobile" && (
              <Box mt="1">
                <OrientationSwitch updateSentencesView={setSentencesView} />
              </Box>
            )}
          </Flex>
      </Box>
      <SentenceCards isLoading={isLoading} examples={filteredExamples} />
      {searchKeyword.length > 0 && examples.length <= 0 && !isLoading && (
        <EmptyResult category={category} keyword={searchKeyword} />
      )}
      <SentenceContextDrawer
        isOpen={isOpenSentenceContextDrawer}
        onOpen={onOpenSentenceContextDrawer}
        onClose={onCloseSentenceContextDrawer}
      />
    </SearchContext.Provider>
  );
}

export default Search;
