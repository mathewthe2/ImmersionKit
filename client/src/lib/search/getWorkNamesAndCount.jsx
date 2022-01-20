function getWorkNamesAndCount(examples) {
    const result = {}
    examples.forEach(example=>{
        const deckName = example['deck_name'];
        result[deckName] = deckName in result ? result[deckName] + 1 : 1;
    })
    let sorted_result = Object.entries(result)
    sorted_result.sort((a,b) => a[0].localeCompare(b[0]))
    return sorted_result
}

export default getWorkNamesAndCount