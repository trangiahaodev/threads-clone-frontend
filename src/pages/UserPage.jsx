import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

function UserPage() {
  // React hooks
  const [userPosts, setUserPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const { username } = useParams();

  // Custom hooks
  const showToast = useShowToast();
  const { loading, user } = useGetUserProfile(); // Get user to render userHeader

  useEffect(() => {
    // Get posts of a user
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUserPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUserPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setUserPosts]);

  if (!user && loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && userPosts.length === 0 && (
        <h1>This user has no posts</h1>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {userPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}

export default UserPage;
