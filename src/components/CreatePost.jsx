import { useRef, useState } from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";

import usePreviewImage from "../hooks/usePreviewImage";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const MAX_CHAR = 500;

function CreatePost() {
  // React hooks
  const imageRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [loading, setLoading] = useState(false);

  // Chakra UI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Custom hooks
  const { imageUrl, handleImageChange, setImageUrl } = usePreviewImage();
  const showToast = useShowToast();

  // Recoil
  const user = useRecoilValue(userAtom);

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post created successfully", "success");
      onClose();
      setPostText("");
      setImageUrl("");
    } catch (err) {
      showToast("Error", err, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}>
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent bg={"gray.800"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here..."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.500"}>
                {remainingChar}/500
              </Text>

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imageUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageUrl} alt="Selected image" />
                <CloseButton
                  onClick={() => {
                    setImageUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
