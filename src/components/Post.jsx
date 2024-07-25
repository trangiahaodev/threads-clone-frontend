import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import ActionButtons from "./ActionButtons";
import getLatestComments from "../../utils/getLatestComments";

function Post({ post, postedBy: user }) {
  const [liked, setLiked] = useState(false);

  const uniqueLatestComments = getLatestComments(post.replies);

  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        {/* Avatars */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name={user?.name} src={user?.profilePicture} />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}

            <div style={{ position: "relative", height: "20px" }}>
              {uniqueLatestComments?.slice(-3).map((reply, index) => (
                <Avatar
                  key={reply._id}
                  size={"xs"}
                  name={reply.name}
                  src={reply.userProfilePicture}
                  position={"absolute"}
                  bottom={"0px"}
                  right={`${index * 15}px`}
                  padding={"2px"}
                />
              ))}
            </div>
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
