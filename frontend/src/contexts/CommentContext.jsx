import { createContext, useState } from "react";

const CommentContext = createContext();

function CommentContextProvider({ children }) {
  const [comments, setComments] = useState({
    root: {
      children: [],
    },
  });

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export { CommentContext, CommentContextProvider };
