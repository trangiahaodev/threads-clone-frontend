import useShowToast from "./useShowToast";

function useDeletePost({ post }) {
  const showToast = useShowToast();

  const handleDeletePost = async (e) => {
    e.preventDefault();

    try {
      if (!window.confirm("Are you sure to delete this post?")) return;
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleDeletePost };
}

export default useDeletePost;
