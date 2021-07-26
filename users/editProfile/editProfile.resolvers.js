import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async(
            _,          
            {firstName,lastName,username,email, password : newPassword, bio, avator},
            {loggedInUser}
             ) => {
            let uglyPassword  = null;
            
            if(newPassword) {
                uglyPassword = await bcrypt.hash(newPassword,10);
            }
            const updatedUser = await client.user.update({
                where: {
                id:loggedInUser.id
            },
            data:{
                firstName,
                lastName,
                username,
                email,
                ...(uglyPassword && { password:uglyPassword }), // uglyPassword가 true면 {} object리턴.(es6문법)  
                bio
            }
        });
        if(updatedUser.id) {
            return {
                ok:true
            };
        }
        else {
            return {
                ok:false,
                error:"Could not update profile."
            };
        }
     }

export default {
    Mutation : {
        editProfile : protectedResolver(resolverFn)
    }
}
//resolver를 보호하는 방식 : resolver함수를 만들고, protectedResolver로 감쌀 거임
//protectedResolver를 호출하면 함수를 리턴. protectedResolver가 리턴하는 함수가 서버가 실행할 함수

//verify는 유저가 준 token과 private key(SECRET_KEY) 사용.