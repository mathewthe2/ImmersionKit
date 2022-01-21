import { useState, useEffect } from "react";
import {
  useColorModeValue,
  Icon,
  Text,
  Box,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { getDeckNames, getModelNames, getModelFields, ANKI_FIELD_VALUES } from "lib/settings/anki";
import { VscNotebook } from "react-icons/vsc";

function Anki() {
  const [deckNames, setDeckNames] = useState([]);
  const [modelNames, setModelNames] = useState([]);
  const [activeModel, setActiveModel] = useState("");
  const [fieldNames, setFieldNames] = useState([]);

  useEffect(() => {
    getDeckNames().then((deckNames) => setDeckNames(deckNames.sort()));
    getModelNames().then((modelNames) => setModelNames(modelNames.sort()));
  }, {});

  useEffect(() => {
    if (activeModel.length > 0) {
      getModelFields(activeModel).then((fieldNames) =>
        setFieldNames(fieldNames)
      );
    } else {
      setFieldNames([]);
    }
  }, [activeModel]);

  function FieldsTable() {
    return (
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fieldNames.map((fieldName) => (
            <Tr key={`fieldName_${fieldName}`}>
              <Td>{fieldName}</Td>
              <Td>
                  <Select placeholder="Select option">
                    {ANKI_FIELD_VALUES.map((fieldValueName) => (
                        <option key={`anki_field_value_${fieldValueName}`} value={fieldValueName}>{fieldValueName}</option>
                    ))}
                  </Select>
                </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }

  return (
    <Box
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      pt={5}
      pl={10}
      pb={10}
      pr={10}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="3xl" fontWeight="semibold" pb={5}>
        <Icon mr="2" mb="2" boxSize="7" as={VscNotebook} />
        Anki
      </Text>
      <Text mb={2}>Deck</Text>
      <Select placeholder="Select deck">
        {deckNames.map((deckName) => (
          <option key={`deck_option_${deckName}`} value={deckName}>
            {deckName}
          </option>
        ))}
      </Select>
      <br />
      <Text mb={2}>Model</Text>
      <Select
        placeholder="Select deck"
        onChange={(e) => setActiveModel(e.target.value)}
      >
        {modelNames.map((modelName) => (
          <option key={`model_option_${modelName}`}  value={modelName}>{modelName}</option>
        ))}
      </Select>
      <br />
      {fieldNames.length > 0 && <FieldsTable />}
    </Box>
  );
}

export default Anki;
