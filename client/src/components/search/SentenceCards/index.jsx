import { useState, useEffect, useContext } from "react";
import { useBreakpointValue, SlideFade } from "@chakra-ui/react";
import CardListView from "./CardListView";
import CardCalendarView from "./CardCalendarView";
import SearchContext from "context/search/SearchContext";
import InfiniteScroll from "react-infinite-scroller";
import { EXAMPLES_TO_LOAD } from "lib/search/config";
import examplesToCards from "lib/search/examplesToCards";
import CardStreamView from "./CardStreamView";

function SentenceCards({ isLoading, examples }) {
  const { sentencesView } = useContext(SearchContext);
  const [currentExamples, setCurrentExamples] = useState(
    examples.slice(0, EXAMPLES_TO_LOAD)
  );
  const [hasMore, setHasMore] = useState(true);
  const viewport = useBreakpointValue({ base: "mobile", sm: "tablet" });

  useEffect(() => {
    if (examples) {
      setCurrentExamples(examples.slice(0, EXAMPLES_TO_LOAD));
      setHasMore(EXAMPLES_TO_LOAD < examples.length);
    }
  }, [examples]);

  const fetchData = (page) => {
    let examples_to_load = page * EXAMPLES_TO_LOAD;
    if (page * EXAMPLES_TO_LOAD >= examples.length) {
      examples_to_load = examples.length;
      setHasMore(false);
    }
    setCurrentExamples(examples.slice(0, examples_to_load));
  };

  const cards = examplesToCards(currentExamples); 
  
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchData}
      hasMore={hasMore}
      loader={<div className="loader" key={0}></div>}
    >
      {(sentencesView === "calendar" || viewport === "mobile") && (
        <SlideFade in={!isLoading && examples?.length > 0}>
          <CardCalendarView cards={cards} />
        </SlideFade>
      )}
      {sentencesView === "list" && viewport !== "mobile" && (
        <SlideFade in={!isLoading && examples?.length > 0}>
          <CardListView cards={cards} />
        </SlideFade>
      )}
      {sentencesView === "stream" && viewport !== "mobile" && (
        <SlideFade in={!isLoading && examples?.length > 0}>
          <CardStreamView cards={cards} />
        </SlideFade>
      )}
    </InfiniteScroll>
  );
}

export default SentenceCards;
