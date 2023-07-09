import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import { Post, PostsDocument } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useQuery<{ posts: Post[] }>({ query: PostsDocument });
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
