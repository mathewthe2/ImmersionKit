const getDeckNames = async() => {
    const response = await fetch(`${process.env.ANKI_HOST}/api/decks`, {
            method: "GET",
            headers: { 'xc-auth': process.env.ANKI_HOST }
        })
    const content = await response.json();
    return content 
}

const getModelNames = async() => {
    const response = await fetch(`${process.env.ANKI_HOST}/api/models`, {
            method: "GET",
            headers: { 'xc-auth': process.env.ANKI_HOST }
        })
    const content = await response.json();
    return content 
}

export { getDeckNames, getModelNames };