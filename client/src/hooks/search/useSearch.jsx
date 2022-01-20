import { useState, useEffect } from 'react'

// const delayedFetcher = (...args) => new Promise((resolve) => setTimeout(resolve, 3000)).then(()=>fetch(...args)).then(res => res.json()) 

async function searchDictionary({keyword, tags, WaniKaniLevel, JLPTLevel, sorting, category}) {
  const searchObject = {
    'keyword': keyword,
    'tags': tags,
    'jlpt': JLPTLevel,
    'wk': WaniKaniLevel,
    'sort': sorting,
    'category': category
  }
  const searchParams =  new URLSearchParams(searchObject).toString();
  const response = await fetch(`${process.env.HOST}/look_up_dictionary?${searchParams}`)
    .catch(error=> {
      throw new Error(error.message)
    });
  const data = await response.json();
  return data
}

function useSearch ({keyword, tags, WaniKaniLevel, JLPTLevel, sorting, category}) {
  const initData = {
    examples: [],
    categoryCount: {},
    dictionaryEntries: [],
    exactMatch: false
  }
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);

  const shouldFetch = () => keyword?.length > 0

  useEffect(() => {
    setIsLoading(true);
    if (shouldFetch()) {
      searchDictionary({keyword, tags, WaniKaniLevel, JLPTLevel, sorting, category}).then(data=>{
        const hasExamples = data && data.data.length > 0;
        if (hasExamples) {
          setData({
            examples: data.data[0].examples,
            dictionaryEntries: data.data[0].dictionary,
            exactMatch: data.data[0].exact_match,
            categoryCount: data.data[0].category_count
          })
        }
        setIsLoading(false);
      })
    } else {
      setData(initData);
      setIsLoading(false)
    }
  }, [keyword, tags, WaniKaniLevel, JLPTLevel, sorting, category])

  return {
    examples: data.examples,
    dictionaryEntries: data.dictionaryEntries,
    exactMatch: data.exactMatch,
    categoryCount: data.categoryCount,
    isLoading: isLoading,
    // isError: error
  }
}

export default useSearch