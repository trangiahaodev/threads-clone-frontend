import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

function UserPage() {
  return (
    <>
      <UserHeader />
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
