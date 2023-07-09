import React, { useState } from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ForgotPasswordDocument } from "../generated/graphql";
import { useMutation } from "urql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useMutation(ForgotPasswordDocument);
  const [complete, setComplete] = useState(false);
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
        initialValues={{ email: "" }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>Please check your email to change password</Box>
          ) : (
            <Form>
              <InputField
                label={"Email"}
                placeholder={"email"}
                name={"email"}
                type={"email"}
              />
              <Button
                isLoading={isSubmitting}
                type={"submit"}
                colorScheme={"teal"}
                mt={4}
              >
                Send Email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
