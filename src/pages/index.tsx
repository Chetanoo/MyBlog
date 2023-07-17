import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import { Post, PostsDocument } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = useQuery<{ posts: Post[] }>({ query: PostsDocument });
  return (
    <Layout>
      <Link as={NextLink} href="/create-post">
        create post
      </Link>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
