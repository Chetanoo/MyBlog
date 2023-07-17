import React, { useState } from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { ChangePasswordDocument } from "../../generated/graphql";
import NextLink from "next/link";

export const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useMutation(ChangePasswordDocument);
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: router.query.token as string,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            await router.push("/");
          }
        }}
        initialValues={{ newPassword: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label={"New Password"}
              placeholder={"new password"}
              name={"newPassword"}
              type={"password"}
            />
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <Link as={NextLink} href="/forgot-password">
                  Forgot Password?
                </Link>
              </Flex>
            ) : null}
            <Button
              isLoading={isSubmitting}
              type={"submit"}
              colorScheme={"teal"}
              mt={4}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(ChangePassword);
