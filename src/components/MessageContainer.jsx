import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";

function MessageContainer() {
  return (
    <Flex
      flex={"70"}
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
      p={2}>
      {/* Message Header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          johndoe <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      {/* Messages */}
      <Flex
        flexDirection={"column"}
        gap={4}
        my={4}
        px={2}
        height={"400px"}
        overflowY={"auto"}>
        {true &&
          [0, 1, 2, 3, 4].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              p={1}
              alignItems={"center"}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}>
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w="250px" />
                <Skeleton h={"8px"} w="250px" />
                <Skeleton h={"8px"} w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={false} />
      </Flex>

      <MessageInput />
    </Flex>
  );
}

export default MessageContainer;
