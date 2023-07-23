/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment CommonError on FieldError {\n  field\n  message\n}": types.CommonErrorFragmentDoc,
    "fragment CommonUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}": types.CommonUserFragmentDoc,
    "fragment CommonUserResponse on UserResponse {\n  user {\n    ...CommonUser\n  }\n  errors {\n    ...CommonError\n  }\n}": types.CommonUserResponseFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    createdAt\n    updatedAt\n    id\n    title\n    text\n    rating\n    creatorId\n  }\n}": types.CreatePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    ...CommonUser\n  }\n}": types.MeDocument,
    "query Post($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      createdAt\n      updatedAt\n      id\n      title\n      text\n      textSnippet\n      rating\n      creatorId\n    }\n    hasMore\n  }\n}": types.PostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CommonError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment CommonError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CommonUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment CommonUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CommonUserResponse on UserResponse {\n  user {\n    ...CommonUser\n  }\n  errors {\n    ...CommonError\n  }\n}"): (typeof documents)["fragment CommonUserResponse on UserResponse {\n  user {\n    ...CommonUser\n  }\n  errors {\n    ...CommonError\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    createdAt\n    updatedAt\n    id\n    title\n    text\n    rating\n    creatorId\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    createdAt\n    updatedAt\n    id\n    title\n    text\n    rating\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    user {\n      ...CommonUser\n    }\n    errors {\n      ...CommonError\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...CommonUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...CommonUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      createdAt\n      updatedAt\n      id\n      title\n      text\n      textSnippet\n      rating\n      creatorId\n    }\n    hasMore\n  }\n}"): (typeof documents)["query Post($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      createdAt\n      updatedAt\n      id\n      title\n      text\n      textSnippet\n      rating\n      creatorId\n    }\n    hasMore\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;