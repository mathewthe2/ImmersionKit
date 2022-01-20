import React from "react";

interface IWebsiteContext {
  isOpenDictionary: boolean;
  onOpenDictionary?: () => void;
  lookupOnDictionary? : (searchKeyword: string) => void;
}

const defaultState = {
    isOpenDictionary: false,
};

const WebsiteContext = React.createContext<IWebsiteContext>(defaultState);

export default WebsiteContext 
