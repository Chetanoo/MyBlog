import { useQuery } from "urql";
import { MeDocument, User } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const [{ data, fetching }] = useQuery<{ me: User }>({
    query: MeDocument,
  });
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [fetching, data, router]);
};
