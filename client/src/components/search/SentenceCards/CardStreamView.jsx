import {
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuGroup,
  MenuItem,
  Heading,
  Image,
  Text,
  Box,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiUserVoice } from "react-icons/bi";
import { hasFuriganaReading } from "lib/search/parser";
import { Sentence, Translation } from "components/search/Example";
import useAudioPlayer from "hooks/media/useAudioPlayer";
import SearchContext from "context/search/SearchContext";
import { Fragment, useContext } from "react";
import {
  FaEllipsisH,
  FaRegCopy,
  FaRegFileArchive,
  FaRegFileAudio,
  FaRegFileImage,
  FaRegFlag,
} from "react-icons/fa";
import exportToAnki from 'lib/search/download/exportToAnki';
import downloadSentenceAudio from "lib/search/download/downloadSentenceAudio";
import downloadSentenceScreenshot from "lib/search/download/downloadSentenceScreenshot";

function CardStreamView({ cards }) {
  const { setSelectedExample, onOpenSentenceContextDrawer } =
    useContext(SearchContext);
  const { playAudio } = useAudioPlayer({ playbackSpeed: 1 });

  const fallbackColor = useColorModeValue("gray.100", "gray.900");

  const showSentenceContext = (card) => {
    setSelectedExample(card);
    onOpenSentenceContextDrawer();
  };

  const cardBackground = useColorModeValue("white", "gray.800");

  return (

    <Box>
      
      {cards.map((card, index) => (
         <Fragment key={`card_${index}`}>
        <Box  textAlign="center"           bg={cardBackground}
            shadow="lg"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb={8}>
                   <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="l"
                textTransform="uppercase"
                pt={2}
              >
                {card.source}
              </Box>
           <Image
                onClick={() => showSentenceContext(card)}
                _hover={{
                  WebkitTransition: "all 10ms ease",
                  transition: "all 10ms ease",
                  filter: "brightness(60%)",
                }}
                pt={5}
                pb={5}
                margin="auto"
                cursor="pointer"
                // boxSize="500px"
                borderRadius="10"
                objectFit="cover"
                src={card.imageUrl}
                alt={card.imageAlt}
                fallback={
                  <Box boxSize="80px" borderRadius="10" bg={fallbackColor} />
                }
              />
                <Flex justifyContent="center" pl={5} pr={5}>
                    <Box
                      mt={
                        hasFuriganaReading(card.sentenceWithFurigana)
                          ? "15px"
                          : "1px"
                      }
                      pr="5px"
                      cursor="pointer"
                      _hover={{ color: "violet" }}
                    >
                      <BiUserVoice
                        fontSize="42"
                        onClick={() => playAudio(card.soundUrl)}
                      />
                    </Box>
                    <Box
                      lineHeight={
                        hasFuriganaReading(card.sentenceWithFurigana)
                          ? "10"
                          : "initial"
                      }
                    >
                      <Text fontSize="xx-large" fontWeight="bold">
                        <Sentence card={card} />
                      </Text>
                    </Box>
                  </Flex>
               {/* <BiUserVoice
                fontSize="22"
                onClick={() => playAudio(card.soundUrl)}
              />
              <Text fontSize="xx-large" fontWeight="bold">
                <Sentence card={card} />
              </Text> */}
              <Text fontSize="xl" pb={5}>
                  <Translation card={card} />
                </Text>
          </Box>
          {/* {index + 1 < cards.length && (
            <Divider mt="15px" mb="15px" borderColor="gray.300" />
          )} */}
          </Fragment>
      ))}
    </Box>
  );
}

export default CardStreamView;
