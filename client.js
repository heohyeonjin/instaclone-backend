//이 파일은 Prisma Client를 초기화해주는 일만 함
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();

export default client;