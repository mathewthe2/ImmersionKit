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

function CardListView({ cards }) {
  const { setSelectedExample, onOpenSentenceContextDrawer } =
    useContext(SearchContext);
  const { playAudio } = useAudioPlayer({ playbackSpeed: 1 });

  const fallbackColor = useColorModeValue("gray.100", "gray.900");

  const showSentenceContext = (card) => {
    setSelectedExample(card);
    onOpenSentenceContextDrawer();
  };

  return (
    <Box>
      {cards.map((card, index) => (
        <Fragment key={`card_${index}`}>
          <Box>
            <Flex>
              <Image
                onClick={() => showSentenceContext(card)}
                _hover={{
                  WebkitTransition: "all 10ms ease",
                  transition: "all 10ms ease",
                  filter: "brightness(60%)",
                }}
                cursor="pointer"
                boxSize="80px"
                borderRadius="10"
                objectFit="cover"
                src={card.imageUrl}
                alt={card.imageAlt}
                fallback={
                  <Box boxSize="80px" borderRadius="10" bg={fallbackColor} />
                }
              />
              <Box ml="15px">
                <Heading as="h4" size="md">
                  <Flex>
                    <Box
                      mt={
                        hasFuriganaReading(card.sentenceWithFurigana)
                          ? "12px"
                          : "1px"
                      }
                      pr="5px"
                      cursor="pointer"
                      _hover={{ color: "violet" }}
                    >
                      <BiUserVoice
                        fontSize="22"
                        onClick={() => playAudio(card.soundUrl)}
                      />
                    </Box>
                    <Box
                      lineHeight={
                        hasFuriganaReading(card.sentenceWithFurigana)
                          ? "9"
                          : "initial"
                      }
                    >
                      <Sentence card={card} />
                    </Box>
                  </Flex>
                </Heading>

                <Text fontSize="sm">
                  <Translation card={card} />
                </Text>
                <Text
                  mt="3px"
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {card.JapaneseSource ? card.JapaneseSource : card.source}
                </Text>
              </Box>
              <Spacer />
              <Box>
                <Menu isLazy>
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    isRound
                    icon={<FaEllipsisH />}
                  ></MenuButton>
                  <MenuList>
                    <MenuGroup title="Download" fontWeight="extrabold">
                      <MenuItem onClick={()=>exportToAnki(card)} icon={<FaRegFileArchive />}>
                        Anki .apkg
                      </MenuItem>
                      <MenuItem onClick={()=>downloadSentenceAudio(card)} icon={<FaRegFileAudio />}>Audio File</MenuItem>
                      <MenuItem onClick={()=>downloadSentenceScreenshot(card)} icon={<FaRegFileImage />}>Screenshot</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Copy" fontWeight="extrabold">
                      <MenuItem icon={<FaRegCopy />}>Audio URL </MenuItem>
                      <MenuItem icon={<FaRegCopy />}>Sentence</MenuItem>
                    </MenuGroup>
                    {/* <MenuDivider />
                    <MenuItem icon={<FaRegFlag />}>Report Issue</MenuItem> */}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Box>
          {index + 1 < cards.length && (
            <Divider mt="15px" mb="15px" borderColor="gray.300" />
          )}
        </Fragment>
      ))}
    </Box>
  );
}

export default CardListView;
