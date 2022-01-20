export const CATEGORIES_MAP = {
    'Anime': 'anime',
    'Games': 'games',
    'Drama': 'drama',
    'News': 'news',
    'Literature': 'literature'
} 

export const CATEGORIES_NAMES_MAP = Object.fromEntries(Object.entries(CATEGORIES_MAP).map(a => a.reverse()))

export const EXAMPLES_TO_LOAD = 20;

export const hoverBackListCharacters = ["「", "」", "(", ")", "～", "―", "…", "、", "？", "！", "。"]