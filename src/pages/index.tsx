import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import { Post, PostDocument } from "../generated/graphql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RatingControls } from "../components/RatingControls";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useQuery<{
    posts: { posts: Post[]; hasMore: Boolean };
  }>({
    query: PostDocument,
    variables,
  });
  if (!fetching && !data) {
    return (
      <Layout>
        <div>Fetching failed, please try again.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>MyBlog</Heading>

        <Link ml="auto" as={NextLink} href="/create-post">
          create post
        </Link>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
              <RatingControls post={p} />
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>Posted by {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
