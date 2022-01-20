import {
  Badge,
  Select,
  Box,
  Tabs,
  TabList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { chakra, useTab, useStyles } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CATEGORIES_MAP } from "lib/search/config";
import SearchContext from "context/search/SearchContext";

function CategorySelect({ updateCategory, categoryCount }) {
  const router = useRouter();
  const viewport = useBreakpointValue({ base: "mobile", sm: "tablet" });
  const queryCategory = router.query.category
    ? decodeURIComponent(router.query.category)
    : "";
  const { category, updateRouter } = useContext(SearchContext);
  const activeIndex =
    category.length > 0 ? Object.values(CATEGORIES_MAP).indexOf(category) : 0;

  useEffect(() => {
    if (queryCategory) {
      if (queryCategory.length > 0) {
        updateCategory(queryCategory);
      }
    }
  }, [queryCategory]);

  const changeCategory = (index) => {
    const newCategory = Object.values(CATEGORIES_MAP)[index];
    updateCategory(newCategory);
    updateRouter({ category: newCategory });
  };

  // 1. Reuse the styles for the Tab
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" });

  const CustomTab = React.forwardRef((props, ref) => {
    // 2. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    // 3. Hook into the Tabs `size`, `variant`, props
    const styles = useStyles();
    // console.log('count', CATEGORIES_MAP[props.category])

    return (
      <StyledTab __css={styles.tab} {...tabProps}>
        {tabProps.children}
        {props.count >= 0 && (
          <Box as="span" ml="2">
            {isSelected ? (
              <Badge variant="solid" colorScheme="purple">
                {props.count}
              </Badge>
            ) : (
              <Badge variant="outline">{props.count}</Badge>
            )}
          </Box>
        )}
        {/* <Box as="span" mr="2">
            {isSelected ? "13" : "15"}
          </Box> */}
      </StyledTab>
    );
  });

  return (
    <>
      {viewport !== "mobile" && (
        <Tabs
          id="1"
          index={activeIndex}
          className="wrapped"
          isLazy
          variant="soft-rounded"
          colorScheme="purple"
          onChange={changeCategory}
        >
          <TabList display="flex" flexDirection="row" flexWrap="wrap">
            {Object.keys(CATEGORIES_MAP).map((category, index) => (
              <CustomTab
                key={`category_${index}`}
                count={categoryCount[CATEGORIES_MAP[category]]}
              >
                {category}
              </CustomTab>
            ))}
          </TabList>
        </Tabs>
      )}
      {viewport === "mobile" && (
        <Select
          value={activeIndex}
          onChange={(event) => changeCategory(event.target.value)}
        >
          {Object.keys(CATEGORIES_MAP).map((category, index) => (
            <option key={`category_${index}`} value={index}>
              {category} : {categoryCount[CATEGORIES_MAP[category]]}
            </option>
          ))}
        </Select>
      )}
    </>
  );
}

export default CategorySelect;
