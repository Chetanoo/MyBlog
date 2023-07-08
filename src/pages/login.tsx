import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { LoginDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useMutation(LoginDocument);
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            await router.push("/");
          }
        }}
        initialValues={{ username: "", password: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label={"Username"}
              placeholder={"username"}
              name={"username"}
            />
            <Box mt={4}>
              <InputField
                label={"Password"}
                placeholder={"password"}
                name={"password"}
                type={"password"}
              />
            </Box>
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
