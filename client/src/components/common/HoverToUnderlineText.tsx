import { useColorModeValue, chakra, propNames } from "@chakra-ui/react";

import React from "react";

interface Props {
  children: React.ReactNode;
  inactive: Boolean;
}

const HoverToUnderlineText = ({ children, inactive, ...rest }: Props) => {
  const color = useColorModeValue("#322659", "#E9D8FD");
  const linerGradient = `linear-gradient(${color}, ${color})`;
  const Hover = chakra("span", {
    baseStyle: {
      display: "inline",
      backgroundImage: linerGradient,
      backgroundSize: "0% 2px",
      backgroundRepeat: "no-repeat",
      transition: "background-size 0.5s",
      backgroundPosition: "0 100%",
      _hover: {
        backgroundSize: inactive ? "0" : "100% 2px",
      },
    },
  });
  return <Hover {...rest}>{children}</Hover>;
};

export default HoverToUnderlineText;
