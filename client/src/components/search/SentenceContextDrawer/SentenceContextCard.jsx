import { useContext } from 'react';
import {
    Box,
    Heading,
    Flex,
    Image,
    useColorModeValue
  } from "@chakra-ui/react";
import SearchContext from "context/search/SearchContext";
import {
    hasFuriganaReading,
} from "lib/search/parser";
import { BiUserVoice } from "react-icons/bi";
import { Sentence, Translation } from 'components/search/Example';
import useAudioPlayer from "hooks/media/useAudioPlayer";

function SentenceContextCard () {
    const fallbackColor = useColorModeValue("gray.100", "gray.900");
    const { selectedExample } = useContext(SearchContext);
    const { playAudio } = useAudioPlayer({ playbackSpeed: 1 });
    return selectedExample &&
        <Box
        shadow="lg"
        maxW="xl"
        borderWidth="1px"
        borderRadius="lg">
          <Image
              src={selectedExample.imageUrl}
              alt={selectedExample.imageAlt}
              fallback={<Box width="500px" height="300px" bg={fallbackColor} />}
            />
              <Box p="6">
                <Flex>
                <Box
                  mt={
                    hasFuriganaReading(selectedExample?.sentenceWithFurigana)
                      ? "16px"
                      : "1px"
                  }
                  pr="5px"
                  cursor="pointer"
                  _hover={{ color: "violet" }}
                >
                  <BiUserVoice
                    fontSize="36"
                    onClick={() => playAudio(selectedExample?.soundUrl)}
                  />
                </Box>
           
             <Heading as="h2" size="lg">
                <Sentence card={selectedExample} />
            </Heading>
            </Flex>
            <Translation card={selectedExample} />
            </Box>
        </Box>
}

export default SentenceContextCard