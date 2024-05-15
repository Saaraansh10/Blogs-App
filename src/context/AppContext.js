import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";
//context create krlia
export const AppContext = createContext();
//context provider bnayenge , index.js me dekho
export default function AppContextProvider({ children }) {
  //initially 0 posts hai
  const [posts, setPosts] = useState([]);
  //loading ko initially false set krenge
  const [loading, setLoading] = useState(false);
  //initially page 1 ka data display hoga
  const [page, setPage] = useState(1);
  //total pages abhi pta ni hai isliye null dalenge
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  // Fetch Blog Data
  //paging default 1 hai
  const fetchBlogPosts = async (page = 1, tag=null, category) => {
    //set loading true krdia
    setLoading(true);
    //baseurl plus page ka no add krna hai
    let url = `${baseUrl}?page=${page}`;
    //tag hai to url chnge krre
    if(tag) {
      url += `&tag=${tag}`;
    }
    //category hai to url chnge krre
    if(category) {
      url += `&category=${category}`;
    }
    try {
      //json me convert krna data ko
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");
      //page ke data ko set krdia
      console.log("Api Response", data);
      setPage(data.page);
      //posts ke data ko set krdia
      setPosts(data.posts);
      //total pages ka data daaldo 
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // next aur previous button dbane pe kya hoga
  const handlePageChange = (page) => {
    //pages ke bich me navigate krne ke liye
    navigate( { search: `?page=${page}`});
    setPage(page);
  };
//ek object hai jiske andr saare ke saare states aur functions stored hai
  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };
//syntax of app context provider
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
