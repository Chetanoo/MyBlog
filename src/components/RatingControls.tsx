import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PostSnippetFragment, VoteDocument } from "../generated/graphql";
import { useMutation } from "urql";

interface UpvoteControlsProps {
  post: PostSnippetFragment;
}

export const RatingControls: React.FC<UpvoteControlsProps> = ({ post }) => {
  const [loading, setLoading] = useState<
    "like-loading" | "dislike-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useMutation(VoteDocument);
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      mr={4}
    >
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoading("like-loading");
          await vote({ postId: post.id, value: 1 });
          setLoading("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loading === "like-loading"}
        aria-label={"like post"}
        icon={<ChevronUpIcon w={6} h={6} />}
      />
      {post.rating}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoading("dislike-loading");
          await vote({ postId: post.id, value: -1 });
          setLoading("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loading === "dislike-loading"}
        aria-label={"dislike post"}
        icon={<ChevronDownIcon w={6} h={6} />}
      />
    </Flex>
  );
};
