import { useContext } from 'react';
import { Flex, Grid, Image, Box, useColorModeValue } from "@chakra-ui/react";
import { BiUserVoice } from "react-icons/bi";
import SearchContext from "context/search/SearchContext"
import useAudioPlayer from "hooks/media/useAudioPlayer";
import { hasFuriganaReading } from "lib/search/parser";
import { Sentence, Translation } from "components/search/Example";

function CardCalendarView({ cards }) {
  const { setSelectedExample, onOpenSentenceContextDrawer } =
    useContext(SearchContext);
  const { playAudio } = useAudioPlayer({ playbackSpeed: 1 });
  const cardBackground = useColorModeValue("white", "gray.800");
  const fallbackColor = useColorModeValue("gray.100", "gray.900");

  const showSentenceContext = (card) => {
    setSelectedExample(card);
    onOpenSentenceContextDrawer();
  };

  return (
    <Grid
      templateColumns={{
        base: "1",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
    >
      {cards.map((card, index) => {
        const { sentenceWithFurigana, imageUrl, imageAlt, source } = card;
        return (
          <Box
            key={`calendar_card_${index}`}
            bg={cardBackground}
            shadow="lg"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              onClick={() => showSentenceContext(card)}
              _hover={{
                WebkitTransition: "all 10ms ease",
                transition: "all 10ms ease",
                filter: "brightness(60%)",
              }}
              cursor="pointer"
              fallback={<Box height="160" bg={fallbackColor} />}
            />
            <Box p="6">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                {source}
              </Box>
              <Flex>
                <Box
                  mt={
                    hasFuriganaReading(card.sentenceWithFurigana)
                      ? "18px"
                      : "15px"
                  }
                  pr="5px"
                  cursor="pointer"
                  _hover={{ color: "violet" }}
                >
                  <BiUserVoice
                    fontSize="24"
                    onClick={() => playAudio(card.soundUrl)}
                  />
                </Box>
                <Box
                  mt={hasFuriganaReading(sentenceWithFurigana) ? "2" : "3"}
                  lineHeight={
                    hasFuriganaReading(sentenceWithFurigana) ? "10" : "initial"
                  }
                  fontWeight="semibold"
                  as="h4"
                  fontSize="xl"
                >
                  <Sentence card={card} />
                </Box>
              </Flex>

              <Box mt="2">
                <Translation card={card} />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
}

export default CardCalendarView;
