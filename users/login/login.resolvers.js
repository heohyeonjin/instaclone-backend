//create account resolver생성
import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
export default {
    Mutation:{
       
        login : async(_,{username,password}) => {
            //1. find user with args.username
            const user = await client.user.findFirst({where:{username}})
            if (!user) {
                return{
                    ok:false,
                    error:"User not found."
                };
            }
            //2. check password with args.password
            const passwordOk = await bcrypt.compare(password,user.password); //user.password : ugly password
            if(!passwordOk){
                return{
                    ok:false,
                    error:"Incorrect password."
                };
            }

            //3. issue a token and sent it to the user
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
            return{
                ok:true,
                token,
            }
        }
    }
}


//findFirst --> 조건(filter)에 맞는 첫 번째 사용자를 리턴
//존재하는 user가 있으면 existingUser가 user가 될 것임.
//prisma 는 await를 해주어야함. 그래야 코드가 다음으로 넘어갈 수 있음 (브라우저가 prisma가 끝날 떄까지 기다림)