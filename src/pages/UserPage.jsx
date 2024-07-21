import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (err) {
        showToast("Error", err, "error");
      }
    };

    getUser();
  }, [username, showToast]);

  return (
    <>
      {/* This one is gonna last when we implement isLoading */}
      {user && <UserHeader user={user} />}
      {/* <UserHeader user={user} /> */}
      <UserPost
        likes={1200}
        replies={421}
        postImg="/post1.png"
        postTitle="Let's talk about threads"
      />
      <UserPost
        likes={5323}
        replies={9912}
        postImg="/ambatukam.jpg"
        postTitle="AMBATUKAMMMMMMMMMM"
      />
      <UserPost
        likes={143}
        replies={857}
        postImg="/post3.png"
        postTitle="I love this guy."
      />
      <UserPost likes={5314} replies={91} postTitle="This is my first post" />
    </>
  );
}

export default UserPage;
