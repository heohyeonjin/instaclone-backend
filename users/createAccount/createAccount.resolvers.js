//create account resolver생성
import bcrypt from "bcrypt";
import client from "../../client";
export default {
    Mutation:{
         createAccount : async (_,
            { firstName, lastName, username, email, password } //사용자가 우리에게 줄 데이터
        ) => { //check if username or email are already on DB.
        try {
            const existringUser = await client.user.findFirst({
                where : {
                    OR:[{username},{email}]  //findfirst에 filter를 써서 argument인 username이랑 같은 username을 찾거나 email을 찾음
                }
            });
            if(existringUser){ // 유저가 존재하면, 새 유저를 만들 수 없음
                throw new Error("This username/password is already taken.");
            }
            // if not already on DB, hash password
            const uglyPassword = await bcrypt.hash(password,10); // 10 : saltround(hash끝에 무작위로 추가되는 텍스트, hash를 또다른 hash와 구별할 수 있도록 해줌)
            return client.user.create({ //user return
                data:{
                    username,
                    email,
                    firstName,
                    lastName,
                    password:uglyPassword
                }
            });
        }
        catch(e){
            return e;
        }
            // save and return the user
        },
    
    }
};





//findFirst --> 조건(filter)에 맞는 첫 번째 사용자를 리턴
//존재하는 user가 있으면 existingUser가 user가 될 것임.
//prisma 는 await를 해주어야함. 그래야 코드가 다음으로 넘어갈 수 있음 (브라우저가 prisma가 끝날 떄까지 기다림)