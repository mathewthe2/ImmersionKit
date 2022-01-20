import { chakra } from "@chakra-ui/react"
import HoverToUnderlineText from "components/common/HoverToUnderlineText"
import { hoverBackListCharacters } from "./config"

const HighlightedText = chakra("span", {
  baseStyle: {
    color: "purple.400",
  },
})

const filterEmpty = (list) => list.filter(word=>word.replace(/\s/g,'').length > 0)

const parseEntryList = (list) => {
  if (!list) {
    return []
  }
  const filteredList = filterEmpty(list)
  return filteredList.filter((item, index)=>{
    const redundant = index+1 < filteredList.length && item === '.' && filteredList[index+1] === '.';
    return !redundant
  })
}

const getWordListPositions = (wordList) => {
  if (wordList.length <= 0) {
      return [];
  }
  const result = [0]; 
  let position = 0;
  let i = 1;
  while (i < wordList.length) {
      position += wordList[i-1].length
      result.push(position)
      i += 1
  }
  return result
}

export const getHoverableSentence = ({wordList, wordEntryList, sentenceWithFurigana, exampleId, lookupOnDictionary}) => {
  if (!wordList) {
    return ''
  }
  const filteredWordList = filterEmpty(wordList)
  const filteredEntryList = parseEntryList(wordEntryList)
  // console.log('wordlist', filteredWordList)
  // console.log('list', filteredEntryList)
  const wordListPosition = getWordListPositions(filteredWordList);
  const furiganaList = getFuriganaList(sentenceWithFurigana)
  const kanjiList = furiganaList.filter(item=>item.kanji.length > 0)
  let kanjiPointer = 0;

  const results = [];
  let index = 0;
  while (index < filteredWordList.length) {
    const word = filteredWordList[index];
    const item = kanjiList[kanjiPointer];
    const dictionaryEntry = filteredEntryList[index]
    const canHover = !hoverBackListCharacters.includes(word);
    let result = ( 
      canHover 
      ?
      <HoverToUnderlineText onClick={(event)=>lookupOnDictionary(event.target.getAttribute('lookup'))} >
        <span lookup={word}>
          {word}
        </span>
      </HoverToUnderlineText>
      :
      <HoverToUnderlineText inactive >{word}</HoverToUnderlineText>
    );
    
    if (index+1 < filteredWordList.length) {
      if (wordListPosition[index] < item?.index && wordListPosition[index+1] > kanjiList[kanjiPointer].index) {
        const preKanji = word.substring(0, word.length - item.kanji.length); // prekanji, for example お in お前
        result = (
          <HoverToUnderlineText onClick={(event)=>lookupOnDictionary(event.target.getAttribute("lookup"))}>
              <span lookup={preKanji + item.kanji}>
                {preKanji}
              </span>
              <ruby key={`hover_${exampleId}_item${index}`} lookup={preKanji + item.kanji}>
                {item.kanji}
                <rt style={{WebkitUserSelect: 'none'}}>
                  {item.furigana}
                </rt>
              </ruby>
          </HoverToUnderlineText>
        )
        kanjiPointer += 1
      }
    }

    if (kanjiPointer < kanjiList.length && wordListPosition[index] === item?.index) {
      if (item.kanji.length <= word.length) {
        const tail = word.substring(item.kanji.length, word.length)
        result = (
          <HoverToUnderlineText onClick={(event)=>lookupOnDictionary(event.target.getAttribute("lookup"))}>
            <ruby lookup={item.kanji + tail} key={`hover_${exampleId}_item${index}`}>
              {item.kanji}
              <rt style={{WebkitUserSelect: 'none'}}>
                {item.furigana}
              </rt>
            </ruby>
            <span lookup={item.kanji + tail}>
              {tail}
            </span>
          </HoverToUnderlineText>
        )
        kanjiPointer += 1
      } else {
        let combinedWord = word;
        let extraWords = 0;
        while (item.kanji.length > combinedWord.length) {
          extraWords += 1;
          combinedWord += filteredWordList[index+extraWords];  // combined kanji, for example 共同署名 (single reading)
        }

        let tailKanji = '';
        if (item.kanji.length < combinedWord.length) {
          if (kanjiPointer+1 < kanjiList.length && 
            kanjiList[kanjiPointer].index+combinedWord.length >= kanjiList[kanjiPointer+1].index) {
              tailKanji = kanjiList[kanjiPointer+1].kanji;
              kanjiPointer += tailKanji?.length;
            }
          }
          result = (
            <HoverToUnderlineText onClick={(event)=>lookupOnDictionary(event.target.getAttribute('lookup'))}>
              <ruby key={`hover_${exampleId}_item${index}`}>
                {item.kanji.length === combinedWord.length ? 
                  filteredWordList.slice(index, index+extraWords+1).map((kanji, kanjiIndex)=>(
                    <span lookup={combinedWord} key={`${exampleId}_${index}_kanji_${kanjiIndex}`}>
                      {kanji}
                    </span>
                  ))
                  :
                    <span lookup={combinedWord}>
                     {item.kanji}{tailKanji}
                    </span>
                }
                <rt style={{WebkitUserSelect: 'none'}}>
                  {item.furigana}
                </rt>
              </ruby>
              <span lookup={combinedWord}>
              {combinedWord.substring(item.kanji.length + tailKanji.length, combinedWord.length) }
              </span>
            </HoverToUnderlineText>
          )
        index += extraWords;
        kanjiPointer += 1;
      }
    }
    results.push(result);
    index += 1;
  }
  return results.map((word, index)=>
    (
      <span style={{color: "transparent"}} key={`hover_${exampleId}_${index}`}>
        {word}
      </span>
    ))
}

export const parseSentence = ({exampleId, wordList, wordIndexes, sentenceWithFurigana, updateKeyword, exactMatch}) => {
    if (!wordList) {
      return ''
    }

    if (!wordIndexes) {
      return parseExactSentenceWithFurigana({
        exampleId, 
        sentence: wordList.join(''),
        sentenceWithFurigana,
        keyword: ''
      })
    }

    if (exactMatch?.length > 0) {
      return parseExactSentenceWithFurigana({
        exampleId,
        sentence: wordList.join(''),
        sentenceWithFurigana,
        keyword: exactMatch
      })
    }

    const furiganaList = getFuriganaList(sentenceWithFurigana)
    const trimmedSentence = wordList.join('').replace(/\s/g,'')
    let sentenceIndexPointer = 0;
    const keywordIndexes = [];
    wordList.forEach((word, index)=>{
      if (wordIndexes.includes(index)) {
        for (let i = 0; i < word.length; i++) {
          keywordIndexes.push(sentenceIndexPointer+i)
        } 
      }
      sentenceIndexPointer += word.replace(/\s/g,'').length;
    })
    return (
      furiganaList
      .filter(item=>item.kanji?.length > 0 || item.furigana?.length > 0)
      .map((item, index)=>(
        item.kanji.length > 0 ? 
        <ruby key={`example_${exampleId}_item${index}`}>
          {[].map.call(item.kanji, (kanjiCharacter, characterIndex)=>{
            const kanjiRootIndex = trimmedSentence.length - item.reversedIndex - (item.kanji.length - characterIndex);
            return keywordIndexes.includes(kanjiRootIndex) ?
            <HighlightedText key={`example_${exampleId}_sentence_${index}_kanji_${characterIndex}`}>
              {kanjiCharacter}
            </HighlightedText>
            :
            kanjiCharacter
            })}
          <rt style={{WebkitUserSelect: 'none'}}>{item.furigana}</rt>
        </ruby>
        :
        [].map.call(item.furigana, (furiganaCharacter, characterIndex)=>{
          const furiganaRootIndex = trimmedSentence.length - item.reversedIndex - (item.furigana.length - characterIndex);
          return keywordIndexes.includes(furiganaRootIndex) ?
          <HighlightedText key={`example_${exampleId}_sentence_${index}_furigana_${characterIndex}`}>
            {furiganaCharacter}
          </HighlightedText>
          :
          <span key={`example_${exampleId}_sentence_${index}_furigana_${characterIndex}`}>
          {furiganaCharacter}
          </span>
          })
      ))
      )
  }

  export const hasFuriganaReading = (sentence) => sentence.indexOf('[') >= 0 && sentence.indexOf(']') >= 0;

  const parseExactSentenceWithFurigana = ({exampleId, sentence, sentenceWithFurigana, keyword}) => {
    const trimmedSentence = sentence.replace(/\s/g,'')
    const keyword_heads= [...trimmedSentence.matchAll(new RegExp(keyword, 'gi'))].map(s => s.index)
    const keyword_bodies = []
    keyword_heads.forEach(index=>{
      for (let i = 0; i < keyword.length; i++) {
        keyword_bodies.push(index+i)
      }
    })
    const furiganaList = getFuriganaList(sentenceWithFurigana)
    return (
      furiganaList.map((item, index)=>(
        item.kanji.length > 0 ? 
        <ruby key={`example_${exampleId}_item${index}`}>
          {[].map.call(item.kanji, (kanjiCharacter, characterIndex)=>{
            const kanjiRootIndex = trimmedSentence.length - item.reversedIndex - (item.kanji.length - characterIndex);
            return keyword_bodies.includes(kanjiRootIndex) ?
            <HighlightedText key={`example_${exampleId}_sentence_${index}_kanji_${characterIndex}`}>
              {kanjiCharacter}
            </HighlightedText>
            :
            kanjiCharacter
            })}
          <rt style={{WebkitUserSelect: 'none'}}>{item.furigana}</rt>
        </ruby>
        :
        [].map.call(item.furigana, (furiganaCharacter, characterIndex)=>{
          const furiganaRootIndex = trimmedSentence.length - item.reversedIndex - (item.furigana.length - characterIndex);
          return keyword_bodies.includes(furiganaRootIndex) ?
          <HighlightedText key={`example_${exampleId}_sentence_${index}_furigana_${characterIndex}`}>
            {furiganaCharacter}
          </HighlightedText>
          :
          <span key={`example_${exampleId}_sentence_${index}_furigana_${characterIndex}`}>
          {furiganaCharacter}
          </span>
          })
      ))
    )
  }

  const getFuriganaList = (sentence) => {
    if (sentence === undefined) {
      return ''
    }
    let compiledList = []
    let text = '';
    let parsing_furigana = false;
    let finding_kanji = false;
    let furigana = '';
    let kanji = '';
    let indexCount = 0;
    for (let i = sentence.length-1; i >= 0; i--) {
      if (sentence[i] === ']') {
        parsing_furigana = true;
        if (text.length > 0) {
          // text with no reading 
          compiledList.unshift({
            furigana: text,
            kanji: '',
            reversedIndex: indexCount                                                                                                                              
          })
          indexCount += text.replace(/\s/g,'').length;
          text = '';
        }
      } else if (sentence[i] === '[') {
        parsing_furigana = false;
        finding_kanji = true;
      } else if (parsing_furigana) {
        furigana = sentence[i] + furigana;
      } else if (finding_kanji) {
        if (i === 0 || sentence[i] === ' ') {
          kanji = sentence[i] + kanji;
          // kanji with reading
          compiledList.unshift({
            furigana: furigana,
            kanji: kanji,
            reversedIndex: indexCount,
          })
          indexCount += kanji.trim().length;
          furigana = '';
          kanji = '';
          finding_kanji = false;
        } else {
          kanji = sentence[i] + kanji;
        }
      } else {
        text = sentence[i] + text;
      }
    }
    // text with no reading?
    compiledList.unshift({
      furigana: text,
      kanji: '',
      reversedIndex: indexCount,
    })
    const filteredList =  compiledList
    .filter(item=>item.furigana.length > 0 || item.kanji.length > 0)
    .map(item=>{
      return {
        kanji: item.kanji.replace(/\s/g,''),
        furigana: item.furigana.replace(/\s/g,''),
        reversedIndex: item.reversedIndex
      }
    });
    let rawSentence = '';
    filteredList.forEach(item=>rawSentence += item.kanji ? item.kanji: item.furigana)
    const result = filteredList.map(item=>{
      const itemLength = item.kanji ? item.kanji.length : item.furigana.length;
      return {
        'index': rawSentence.length - item.reversedIndex - itemLength,
        ...item
      }
    })
    return result
  }

  export const parseTranslation = ({exampleId, translation, wordList, wordIndexes}) => {
    if (!wordList) {
      return ''
    }

    const wordsToHighlight = wordIndexes ? wordList.filter((word, index)=>wordIndexes.includes(index)).map(word=>word.toLowerCase()) : [];
    const removePunctuation = string => string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    return (
      <>
        {translation.split(' ').map((word, index)=> (
          wordsToHighlight.includes(removePunctuation(word.toLowerCase())) ?
          <HighlightedText key={`example_${exampleId}_highlighted_${index}`}>{word} </HighlightedText>
          :
          word + ' '
        ))}
      </>
    )
}

  // const parseExactSentence = ({exampleId, sentence, keyword}) => {
  //   const keyword_heads = [...sentence.matchAll(new RegExp(keyword, 'gi'))].map(s => s.index)
  //   const keyword_bodies = []
  //   keyword_heads.forEach(index=>{
  //     for (let i = 1; i < keyword.length; i++) {
  //       keyword_bodies.push(index+i)
  //     }
  //   })
  //   return (
  //     <>
  //      {[].map.call(sentence, (character, index)=>{
  //       if (keyword_heads.includes(index)) {
  //          return (
  //           <HighlightedText key={`example_${exampleId}_sentence_${index}`}>
  //             {keyword}
  //           </HighlightedText>
  //          )
  //       } else if (keyword_bodies.includes(index)) {
  //         return ''
  //       } else {
  //         return character
  //       }
  //       })}
  //     </>
  //   )
  // }