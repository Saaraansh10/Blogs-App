import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
  //consume krre app context ko using use context hook
  const { posts, loading } = useContext(AppContext);
  //loading
  //no blogs
  //blog details
  //post ki length 0 hai to no posts found vrna saari post dikhadenge
  //hr ek single post ko map se bnaliye
  return (
    <div className=" flex flex-col gap-y-10 my-4">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">Loading</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) : (
        posts.map((post) => (
          <BlogDetails key={post.id} post={post}/>
        ))
      )}
    </div>
  );
}
