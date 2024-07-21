import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

import { Link as RouterLink } from "react-router-dom";

import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function UserHeader({ user }) {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Account created",
        status: "success",
        description: "Profile link copied",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  // console.log(currentUser._id, user._id);

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePicture && (
            <Avatar
              name={user.name}
              src={user.profilePicture}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePicture && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.biography}</Text>

      {currentUser._id === user._id.toString() && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update profile</Button>
        </Link>
      )}

      {currentUser._id !== user._id && <Button size={"sm"}>Follow</Button>}
      
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}>
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}>
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
