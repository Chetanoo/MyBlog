import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { CreatePostDocument } from "../generated/graphql";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../hooks/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useMutation(CreatePostDocument);
  return (
    <Layout variant="small">
      <Formik
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            await router.push("/");
          }
          // if (response.data?.createPost.errors) {
          //   setErrors(toErrorMap(response.data.createPost.errors));
          // } else if (response.data?.createPost.post) {
          //   await router.push("/");
          // }
          // console.log(values);
        }}
        initialValues={{ title: "", text: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label={"Title"} placeholder={"title"} name={"title"} />
            <Box mt={4}>
              <InputField
                textarea
                label={"Text"}
                placeholder={"text"}
                name={"text"}
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              type={"submit"}
              colorScheme={"teal"}
              mt={4}
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
