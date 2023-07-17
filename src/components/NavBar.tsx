import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument, User } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useMutation(LogoutDocument);
  const [{ data, fetching }] = useQuery<{ me: User }>({
    query: MeDocument,
    pause: isServer(),
  });

  let body;

  if (!data?.me) {
    body = (
      <>
        <Link as={NextLink} color="white" mr={2} href="/login">
          login
        </Link>
        <Link as={NextLink} color="white" mr={2} href="/register">
          register
        </Link>
      </>
    );
  } else if (fetching) {
    body = <div>loading...</div>;
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} p={4} bg="tan">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
