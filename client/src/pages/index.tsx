import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from 'next/link';
import { KeyboardEvent, useState } from "react";

import {
  chakra,
  Box,
  useColorModeValue,
  Button,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchKeyword();
    }
  };

  const searchKeyword = () => {
    if (keyword.length > 0) {
      router.push(`/search?keyword=${keyword}`);
    }
  };
  return (
    <Box px={4} py={32} mx="auto">
      <Box
        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: "left", md: "center" }}
        mx="auto"
      >
        <chakra.h1
          mb={3}
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color={useColorModeValue("gray.900", "gray.100")}
          lineHeight="shorter"
        >
          Japanese, contextualized.
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          Search for examples in our 180k Anime sentence database. Complete with
          audio, picture, and translation.
        </chakra.p>
        <SimpleGrid
          // as="form"
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx="auto"
          mb={8}
        >
          <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
            <VisuallyHidden>Your Email</VisuallyHidden>
              <Input
                mt={0}
                size="lg"
                placeholder="Enter anything!"
                required
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyDown}
              />
          </GridItem>
          <Link href={`/search/?keyword=${keyword}`} passHref>
            <Button
              as={GridItem}
              w="full"
              variant="solid"
              colSpan={{ base: "auto", lg: 2 }}
              size="lg"
              type="submit"
              colorScheme="brand"
              cursor="pointer"
              disabled={keyword?.length <= 0}
            >
              Search
            </Button>
          </Link>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
