function filterExamples({examples, filterItem}){
    if (!filterItem) {
        return examples
    }
    if (Object.entries(filterItem).length === 0) {
        return examples
    } else {
        const [key, value] = Object.entries(filterItem)[0]
        return examples.filter(example=>example[key] == value)
    }
}

export default filterExamples