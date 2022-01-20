import { useContext, useRef } from "react";
import { Box, Divider } from "@chakra-ui/react";
import SearchContext from "context/search/SearchContext"
import useSentenceContextData from "hooks/search/useSentenceContextData";
import examplesToCards from "lib/search/examplesToCards";
import CardListView from "../SentenceCards/CardListView";
import { useEffect } from "react";
import usePrevious from "hooks/common/usePrevious";
import smoothscroll from 'smoothscroll-polyfill';

function SentenceContextList() {
  const { selectedExample } = useContext(SearchContext);
  const { pretextSentences, posttextSentences, isLoading } =
    useSentenceContextData({
      exampleId: selectedExample?.id,
      category: selectedExample?.category,
    });
  const previousSentences = usePrevious({
    pretextSentences,
    posttextSentences,
  });
  const upperDivider = useRef(null);
  const lowerDivider = useRef(null);

  const scrollToExample = (dividerRef) => {
    if (dividerRef.current) {
      smoothscroll.polyfill();
      dividerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  useEffect(() => {
    if (pretextSentences && posttextSentences) {
      const sentenceInPreviousPosttext =
        previousSentences.posttextSentences?.findIndex(
          (sentence) => sentence.id === selectedExample?.id
        ) > 0;
      scrollToExample(sentenceInPreviousPosttext ? upperDivider : lowerDivider);
    }
  }, [pretextSentences, posttextSentences]);
  return (
    <>
      {pretextSentences && posttextSentences && (
        <Box pl="10" width="100%">
          <CardListView cards={examplesToCards(pretextSentences)} />
          <Divider
            ref={upperDivider}
            mt="15px"
            mb="15px"
            borderColor="gray.300"
          />
          <CardListView cards={[selectedExample]} />
          <Divider
            hidden={posttextSentences.length === 0}
            ref={lowerDivider}
            mt="15px"
            mb="15px"
            borderColor="gray.300"
          />
          <CardListView cards={examplesToCards(posttextSentences)} />
        </Box>
      )}
    </>
  );
}

export default SentenceContextList;
