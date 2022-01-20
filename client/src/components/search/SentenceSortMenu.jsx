import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SearchContext from "context/search/SearchContext";

const sortOptions = [
  {
    label: "Shortness",
    value: "shortness",
  },
  {
    label: "Longness",
    value: "longness",
  },
  {
    label: "None",
    value: "none",
  },
];

function SentenceSortMenu({ setSorting }) {
  const router = useRouter();
  const sort = router.query.sort ? decodeURIComponent(router.query.sort) : '';
  const { sorting, updateRouter } = useContext(SearchContext);

  useEffect(()=> {
    if (sort) {
      if (sort.length > 0) {
        setSorting(sort);
      }
    }
  }, [sort])

  const updateSortMenu = (menuValue) => {
    setSorting(menuValue);
    updateRouter({'sort': menuValue})
  };

  const currentSortLabel = sortOptions.find(
    (sortOption) => sortOption.value === sorting
  )?.label || 'None';

  return (
    <Menu>
      <MenuButton as={Button} size="sm" variant="ghost">
        {currentSortLabel} <ChevronDownIcon />
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue={sorting}
          onChange={updateSortMenu}
          type="radio"
          value={sorting}
        >
          {sortOptions.map((sortOption, index) => (
            <MenuItemOption
              key={`sortOption_${index}`}
              value={sortOption.value}
            >
              {sortOption.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default SentenceSortMenu;
