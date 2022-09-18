import { Post } from "../../interfaces";

export const isPost = (post: any): post is Post => {
  return (
    typeof post.name === "string" &&
    typeof post.last_name === "string" &&
    typeof post.email === "string" &&
    typeof post.title === "string" &&
    typeof post.description === "string"
  );
};
