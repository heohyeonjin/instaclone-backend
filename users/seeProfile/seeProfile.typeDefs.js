import { gql } from "apollo-server";

export default gql`
type Query{
    seeProfile(username:String): User 
}
`

//Create Account --> Mutation, See profile --> Query
//:User --> User return
//graphQl에서는 password필요 없음. 우린 기본적으로 절대로 password를 묻지 않을 거임
//seeProfile(username:String): User // 프로필을 username으로 찾아서 봄 , User return