"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  console.log("User: ", user);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    biography: user.biography,
    password: "",
  });

  return (
    <Flex align={"center"} justify={"center"} my={6}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.dark")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={"md"} src={user.profilePicture} />
            </Center>
            <Center w="full">
              <Button w="full">Change Avatar</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="John Doe"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={inputs.name}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                name: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="johndoe"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={inputs.username}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                username: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={inputs.email}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                email: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Biography</FormLabel>
          <Input
            placeholder="Your bio..."
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}>
            Cancel
          </Button>
          <Button
            bg={"green.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "green.500",
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
