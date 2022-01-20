import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const NavItem = (props) => {
  const { icon, children, ...rest } = props;
  const color = useColorModeValue("inherit", "gray.400");
  const selectedHoverColor = useColorModeValue("gray.100", "gray.900");
  const hoverBackgroundColor = useColorModeValue("gray.100", "gray.900");
  const hoverColor = useColorModeValue("gray.900", "gray.200");
  const groupHoverColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor={props.selected ? "inherit" : "pointer"}
      color={props.selected ? hoverColor : color}
      bg={props.selected ? selectedHoverColor : "inherit"}
      _hover={{
        bg: hoverBackgroundColor,
        color: hoverColor,
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color: groupHoverColor,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
