import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async(token) =>{
    try{
    if(!token)// token안 보냈으면 user는 없음
    {
        return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY); //token 확인
    const user = await client.user.findUnique({where:{id}}); //id는 토큰의 id랑 비교, user찾기
    if(user) {
        return user;
    }
    else {
        return null;
    }
}
catch {
    return null;
}
};

//protectedResovler함수는 실행되지 않은 함수를 리턴하고 있음
//resolver 함수를 리턴하는 함수 정의. 리턴해야 하는 이유는 우리가 argument를 전에 보내고 싶기 때문

export function protectedResolver(ourResolver){
    return function(root, args, context, info) { //이 함수가 아직 불려지지 않은 함수. seeProfile처럼
        if(!context.loggedInUser){
            return {
                ok:false,
                error: "Please login to perfom this action"
            };
        }
        
    return ourResolver(root,args,context,info); //유저가 로그인된 상태라면
    } 
}