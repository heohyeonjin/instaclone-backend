import client from "../../client";

export default{
    Query: {
        seeProfile : (_,{username}) => client.user.findUnique({
            where:{
                username,
            }
        }) //username인자 object안에 존재.
    },
};

//findUnique와 findFirst의 차이점








