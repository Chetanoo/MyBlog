import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { FieldError, RegisterDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [, register] = useMutation(RegisterDocument);
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(
              toErrorMap(response.data.register.errors as FieldError[])
            );
          } else if (response.data?.register.user) {
            await router.push("/");
          }
        }}
        initialValues={{ username: "", password: "", email: "" }}
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
                label={"Email"}
                placeholder={"email"}
                name={"email"}
                type={"email"}
              />
            </Box>
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
