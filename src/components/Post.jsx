import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import ActionButtons from "./ActionButtons";

function Post({ post, postedBy: user }) {
  const [liked, setLiked] = useState(false);

  // *********
  // Optimization: Use aggregation stage to get user's profile while retrieving post
  // Reference: https://chatgpt.com/c/198134f5-81a3-4b2c-bdfd-b1580af0f656
  // *********

  // Fetch user
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await fetch("/api/users/profile/" + userId);
  //       const data = await res.json();
  //       if (data.error) {
  //         showToast("Error", data.error, "error");
  //         return;
  //       }
  //       setUser(data);
  //     } catch (error) {
  //       showToast("Error", error.message, "error");
  //       setUser(null);
  //     }
  //   };

  //   getUser();
  // }, [userId, showToast]);

  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        {/* Avatars */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name={user?.name} src={user?.profilePicture} />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/tioluwani-kolawole"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          {/* Username + Post's description */}
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}>
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          {/* Reaction icons */}
          <Flex gap={3} my={1} className="reactions">
            <ActionButtons liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.replies.length} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default Post;
