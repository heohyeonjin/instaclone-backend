//server를 만들고 작동시키는 일만 함
require("dotenv").config(); //import 대신 사용
import { ApolloServer } from "apollo-server"; 
import {typeDefs,resolvers} from "./schema";
import { getUser, protectResolver} from "./users/users.utils";

const PORT = process.env.PORT;
//Create Apolloserver
const server = new ApolloServer ({
typeDefs,
resolvers,
context : async ({ req }) => {
    return{
      loggedInUser : await getUser(req.headers.token),  //함수는 user를 리턴.
      protectResolver, 
        };
    },
});



//서버 실행
server
    .listen(PORT)
    .then(() => 
        console.log(`🚀 Server running on http://localhost:${PORT} ✅`)
        );
//우리의 앱은 어떤 PORT인지와 상관ㅇ 없이 이 PORT를 듣고 있음



/*const x = (resolver) => (root,args,context,info) => {
    //체크, 유저가 로그인한 상태라면 graphql resolver와 같은 argument를 가진 함수 리턴
    if(!context.loggedInUser){
        return{
            ok:false,
            error:"log in pls"
        }
    }
    return resolver(root,args,context,info);
}*/

