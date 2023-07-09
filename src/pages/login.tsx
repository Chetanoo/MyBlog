import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { LoginDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useMutation(LoginDocument);
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            // @ts-ignore
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            await router.push("/");
          }
        }}
        initialValues={{ usernameOrEmail: "", password: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label={"Username or Email"}
              placeholder={"username or email"}
              name={"usernameOrEmail"}
            />
            <Box mt={4}>
              <InputField
                label={"Password"}
                placeholder={"password"}
                name={"password"}
                type={"password"}
              />
            </Box>
            <Flex mt={2}>
              <Link ml="auto" as={NextLink} href="/forgot-password">
                Forgot Password?
              </Link>
            </Flex>
            <Button
              isLoading={isSubmitting}
              type={"submit"}
              colorScheme={"teal"}
              mt={4}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
