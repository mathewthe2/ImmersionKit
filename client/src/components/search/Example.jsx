import { useContext } from "react";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import {
  parseSentence,
  getHoverableSentence,
  parseTranslation,
  hasFuriganaReading,
} from "lib/search/parser";
import SearchContext from "context/search/SearchContext"
import WebsiteContext from "context/common/WebsiteContext";

function Sentence({ card }) {
  const { exactMatch } = useContext(SearchContext);
  const {lookupOnDictionary } = useContext(WebsiteContext);
  return (
    <Grid templateColumns="1" gap={6}>
      <GridItem colStart={1} rowStart={1}>
        {parseSentence({
          exampleId: card.id,
          wordList: card.wordList,
          wordIndexes: card.wordIndexes,
          sentenceWithFurigana: card.sentenceWithFurigana,
          updateKeyword: null,
          exactMatch: exactMatch,
        })}
      </GridItem>
      <GridItem colStart={1} rowStart={1} mt="2px">
        {getHoverableSentence({
          wordList: card.wordList,
          wordEntryList: card.wordEntryList,
          sentenceWithFurigana: card.sentenceWithFurigana,
          exampleId: card.id,
          lookupOnDictionary
        })}
      </GridItem>
    </Grid>
  );
}

function Translation({ card }) {
  return parseTranslation({
    exampleId: card.id,
    translation: card.translation,
    wordList: card.translationWordList,
    wordIndexes: card.translationWordIndexes,
  });
}

export { Sentence, Translation };
