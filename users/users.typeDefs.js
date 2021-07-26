//prisma의 schema를 typeDefs(graphQL schema)랑 싱크를 맞춰야함
import { gql } from "apollo-server";
export default gql`
    type User{
        id:         String!
        firstName:  String!
        lastName:   String
        username:   String!
        email:      String!
        createdAt:  String!
        updatedAt:  String!
        bio:        String
        avator:     String
    }
`;
