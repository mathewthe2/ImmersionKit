function EmptyResult({keyword, category}) {
    const CATEGORY_MAP = {
        'anime': 'Anime', 
        'games': 'Games',
        'drama': 'Drama',
        'news': 'News',
        'literature': 'Literature'
    }
    return (
        <div style={{paddingTop: 20}}>No results found for &quot;{keyword}&quot; in <b>{CATEGORY_MAP[category]}</b>.</div>
    )
}

export default EmptyResult