import {
  Flex,
  Text,
  Box,
  Select,
  Image,
  useColorModeValue,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState, Fragment } from "react";
import useAudioPlayer from "hooks/media/useAudioPlayer";
import { getDeckNames } from "lib/settings/anki";
import { getNotesByDeck } from "lib/reader/notes";
import { BiUserVoice } from "react-icons/bi";

function Sentence({ sentence, translation, imageUrl, soundUrl}) {
  const fallbackColor = useColorModeValue("gray.100", "gray.900");
  const { playAudio } = useAudioPlayer({ playbackSpeed: 1 });
  return (
    <Box>
      <Flex>
        <Image
          _hover={{
            WebkitTransition: "all 10ms ease",
            transition: "all 10ms ease",
            filter: "brightness(60%)",
          }}
          cursor="pointer"
          boxSize="80px"
          borderRadius="10"
          objectFit="cover"
          src={imageUrl}
          alt={"yy"}
          fallback={<Box boxSize="80px" borderRadius="10" bg={fallbackColor} />}
        />
        <Box ml="15px">
          <Heading as="h4" size="md">
            <Flex>
              <Box
                mt={"1px"}
                pr="5px"
                cursor="pointer"
                _hover={{ color: "violet" }}
              >
                <BiUserVoice
                    fontSize="22"
                    onClick={() => playAudio(soundUrl)}
                />
              </Box>
              <Box>{sentence}</Box>
            </Flex>
          </Heading>

          <Text fontSize="sm">{translation}</Text>
          <Text
            mt="3px"
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          ></Text>
        </Box>
        <Spacer />
        <Box></Box>
      </Flex>
    </Box>
  );
}

function Reader() {
  const [deckNames, setDeckNames] = useState([]);
  const [activeDeck, setActiveDeck] = useState("Anime - Spirited Away");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getDeckNames().then((deckNames) => setDeckNames(deckNames.sort()));
  }, {});

  useEffect(() => {
    // console.log(activeDeck);
    getNotesByDeck({ deckName: activeDeck }).then((notes) => setNotes(notes));
  }, [activeDeck]);

  return (
    <Box>
      <Select placeholder="Select deck" onChange={(e)=>setActiveDeck(e.target.value)}>
        {deckNames.map((deckName) => (
          <option key={`deck_option_${deckName}`} value={deckName} >
            {deckName}
          </option>
        ))}
      </Select>
      {/* {activeDeck} */}
      {notes &&
        notes.map((note, index) => (
            <Box mt={2} mb={2} key={`sentence_${index}`}>
              <Sentence
                sentence={note?.fields?.sentence}
                translation={note?.fields?.translation}
                imageUrl={note?.fields?.image}
                soundUrl={note?.fields?.audio}
              />
            </Box>
        ))}
        {activeDeck.length > 0 && notes.length === 0 && 
        <Text mt={2}>No compatible notes found for {activeDeck}.</Text>}
    </Box>
  );
}

export default Reader;
