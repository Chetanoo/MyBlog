import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { RegisterDocument } from "../generated/graphql";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [, register] = useMutation(RegisterDocument);
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={(values) => {
          console.log(values);
          return register(values);
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
