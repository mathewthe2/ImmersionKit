import { useState, useEffect } from "react";

async function getSentenceContextData({ exampleId, category }) {
  const searchObject = {
    id: exampleId,
    category: category,
  };
  const searchParams = new URLSearchParams(searchObject).toString();
  const response = await fetch(
    `${process.env.HOST}/sentence_with_context?${searchParams}`
  ).catch((error) => {
    throw new Error(error.message);
  });
  const data = await response.json();
  return data;
}

function useSentenceContextData({ exampleId, category }) {
  const initData = {
    exampleId: "",
    category: "",
  };

  console.log("exampleId?", exampleId);

  const shouldFetch = () => exampleId?.length > 0;

  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (shouldFetch()) {
      getSentenceContextData({ exampleId, category }).then((data) => {
        const hasExample = data && "id" in data;
        if (hasExample) {
          setData(data);
        }
        setIsLoading(false);
      });
    } else {
      setData(initData);
      setIsLoading(false);
    }
  }, [exampleId]);

  return {
    pretextSentences: data.pretext_sentences,
    posttextSentences: data.posttext_sentences,
    isLoading: isLoading,
  };
}

export default useSentenceContextData;
