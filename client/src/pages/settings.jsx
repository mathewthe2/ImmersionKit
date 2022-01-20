import { useState, useEffect }  from 'react';
import { Heading, Text, Box, Select } from "@chakra-ui/react";
import { getDeckNames, getModelNames } from "lib/settings/anki"

function Settings() {
    const [deckNames, setDeckNames] = useState([]);
    const [modelNames, setModelNames] = useState([]);

    useEffect(()=> {
        getDeckNames().then(deckNames=>setDeckNames(deckNames));
        getModelNames().then(modelNames=>setModelNames(modelNames));
      }, {})

    return (
        <Box>
            <Heading pb={10}>Settings</Heading>
            <Text>Decks</Text>
            <Select placeholder='Select deck'>
                {deckNames.map(deckName=>(
                        <option value={deckName}>{deckName}</option>
                ))}        
            </Select>
            <br/>
            <Text>Models</Text>
            <Select placeholder='Select deck'>
                {modelNames.map(modelName=>(
                        <option value={modelName}>{modelName}</option>
                ))}
            </Select>
        </Box>
    )
}

export default Settings