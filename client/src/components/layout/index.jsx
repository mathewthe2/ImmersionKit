import React from "react";
import {
  Avatar,
  Logo,
  Text,
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaMoon, FaSun, FaRss, FaClipboardCheck, FaBookReader } from "react-icons/fa";
// import { MdHome } from "react-icons/md";
// import { HiCode, HiCollection } from "react-icons/hi";
import { useRouter } from 'next/router'

const SidebarContent = (props) => {
  const router = useRouter();
 return (
    <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg="gray.800"
    borderColor="blackAlpha.300"
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
        Immersion Kit
      </Text>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <NavItem icon={FiSearch} onClick={()=>router.push('/search')}>Search</NavItem>
      <NavItem icon={FaBookReader} onClick={()=>router.push('/reader')}>Reader</NavItem>
      <NavItem icon={BsGearFill} onClick={()=>router.push('/settings')}>Settings</NavItem>
    </Flex>
  </Box>
 )
}

    const  NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
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
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

 function Layout(props) {
    const { toggleColorMode: toggleMode } = useColorMode();
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const colorModeText = useColorModeValue("dark", "light");
    const sidebar = useDisclosure();
         return (
             <>
         <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
        >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
        >
            <DrawerOverlay />
            <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
            </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
            <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            // bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderColor="blackAlpha.300"
            h="14"
            >
            <IconButton
                aria-label="Menu"
                display={{ base: "inline-flex", md: "none" }}
                onClick={sidebar.onOpen}
                icon={<FiMenu />}
                size="sm"
            />
            <Box display={{ base: "none", md: "flex" }} />

                <Flex align="center">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        aria-label={`Switch to ${colorModeText} mode`}
                        variant="ghost"
                        color="current"
                        ml={{ base: "0", md: "3" }}
                        onClick={toggleMode}
                        icon={<SwitchIcon />}
                    />
                </Flex>
            </Flex>

            <Box as="main" p="4">
            {/* Add content here, remove div below  */}
            {props.children}
            </Box>
        </Box>
        </Box>
             </>
         )
 }

export default Layout;
