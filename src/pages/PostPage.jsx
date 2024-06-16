import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import ActionButtons from "../components/ActionButtons";
import Comments from "../components/Comments";

function PostPage() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        {/* Post Header */}
        <Flex w={"fulle"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" alt="verified" w={"4"} h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Let&apos;s talk about Threads.</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}>
        <Image src="/post1.png" w={"full"} />
      </Box>

      <Flex gap={3} my={3} className="reactions">
        <ActionButtons liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          1200 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} replies
        </Text>
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      <Comments
        comment="Looks really good"
        createdAt="2d"
        likes={100}
        username="johndoe"
        userAvatar="https://bit.ly/prosper-baba"
      />

      <Comments
        comment="It's is outstanding"
        createdAt="1d"
        likes={21}
        username="allentran"
        userAvatar="https://bit.ly/code-beast"
      />

      <Comments
        comment="Lorem ipsum is simply dummy text of the printing and typesetting industry"
        createdAt="3d"
        likes={45}
        username="streetmemory"
        userAvatar="https://bit.ly/sage-adebayo"
      />
    </>
  );
}

export default PostPage;
