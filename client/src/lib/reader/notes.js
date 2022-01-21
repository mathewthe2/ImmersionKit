const getNotesByDeck = async ({deckName}) => {
    const response = await fetch(`${process.env.ANKI_HOST}/api/reader/${deckName}`, {
      method: "GET",
      headers: { "xc-auth": process.env.ANKI_HOST },
    });
    const content = await response.json();
    return content;
  };

export { getNotesByDeck }

