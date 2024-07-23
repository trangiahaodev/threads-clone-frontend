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
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

import { Link as RouterLink } from "react-router-dom";

import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

function UserHeader({ user }) {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);

  // user is the one whose profile is being viewed
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );

  const handleFollowAndUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("Success", "Unfollowed successfully", "success");
        user.followers.pop(); // remove the current user from the followers array
      } else {
        showToast("Success", "Followed successfully", "success");
        user.followers.push(currentUser._id); // add the current user to the followers array
      }

      setFollowing(!following);
    } catch (err) {
      showToast("Error", err, "error");
    } finally {
      setUpdating(false);
    }
  };

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() =>
        showToast("Account created", "Profile link copied", "success")
      );
  };

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

      {currentUser._id !== user._id && (
        <Button
          size={"sm"}
          onClick={handleFollowAndUnfollow}
          isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

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
