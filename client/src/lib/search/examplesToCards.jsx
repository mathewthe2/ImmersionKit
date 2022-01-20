function examplesToCards(examples) {
  return examples.map((example) => {
    return {
      id: example.id,
      source: example.deck_name,
      JapaneseSource: example.deck_name_japanese,
      category: example.category,
      imageUrl: example.image_url,
      imageAlt: example.id,
      soundUrl: example.sound_url,
      sentence: example.sentence,
      sentenceWithFurigana: example.sentence_with_furigana,
      wordList: example.word_list,
      wordIndexes: example.word_index,
      wordEntryList: example.word_dictionary_list,
      translation: example.translation,
      translationWordList: example.translation_word_list,
      translationWordIndexes: example.translation_word_index,
    };
  });
}

export default examplesToCards;
