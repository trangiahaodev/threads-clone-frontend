"use client";

import { useRef, useState } from "react";
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

import usePreviewImage from "../hooks/usePreviewImage";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage() {
  // Recoil hooks
  const [user, setUser] = useRecoilState(userAtom);
  console.log("user: ", user);

  // React hooks
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    biography: user.biography,
    password: "",
  });
  const fileRef = useRef(null);

  // Custom hooks
  const showToast = useShowToast();
  const { handleImageChange, imageUrl } = usePreviewImage();

  // Handle functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePicture: imageUrl }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imageUrl || user.profilePicture}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
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
          <FormControl>
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
          <FormControl>
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
          <FormControl>
            <FormLabel>Biography</FormLabel>
            <Input
              placeholder="Your bio..."
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
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
              }}
              type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
