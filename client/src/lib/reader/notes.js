const getNotesByDeck = async ({ deckName, offset}) => {
    const response = await fetch(`${process.env.ANKI_HOST}/api/reader/${deckName}?offset=${offset}`, {
      method: "GET",
      headers: { "xc-auth": process.env.ANKI_HOST },
    });
    const content = await response.json();
    return content;
  };

export { getNotesByDeck }

