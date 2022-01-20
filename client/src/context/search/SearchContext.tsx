import React from "react";

enum sentencesViewType {
  list = 'list',
  calendar = 'calendar',
  stream = 'stream'
}

interface ISearchContext {
  category: string;
  sentencesView: sentencesViewType;
  exactMatch: boolean;
  sorting?: string;
  selectedExample?: object;
  setSelectedExample?: () => void;
  updateRouter?: () => void;
  onOpenSentenceContextDrawer?: () => void;
}

export const defaultState = {
    category: 'anime',
    exactMatch: false,
    sorting: 'None',
    sentencesView: sentencesViewType.list
};

const SearchContext = React.createContext<ISearchContext>(defaultState);

export default SearchContext 
