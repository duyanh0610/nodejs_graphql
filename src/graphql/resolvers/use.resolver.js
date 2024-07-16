import prisma from "../../db/prisma.js";
const UserResolver = {
  Query: {
    findUsers: async () => {
      try {
        // const result = await prisma.$queryRaw`SELECT * FROM "User"`;
        const result = await prisma.user.findMany({
          take: 2,
          skip: 0,
        });
        return result;
      } catch (error) {
        console.log("🚀 ~ findUsers:async ~ error:", error);
      }
    },
    findUser: async (_, { id }) => {
      try {
        return await prisma.user.findUnique({ where: { id: parseInt(id) } });
      } catch (error) {
        console.log("🚀 ~ findUser:async ~ error:", error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const result = await prisma.$queryRaw;

        return await prisma.user.create({ data: input });
      } catch (error) {
        console.log("🚀 ~ createUser:async ~ error:", error);
      }
    },
    editUser: async (_, { id, input }) => {
      try {
        return await prisma.user.update({
          where: { id: parseInt(id) },
          data: input,
        });
      } catch (error) {
        console.log("🚀 ~ editUser:async ~ error:", error);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        return await prisma.user.delete({ where: { id: parseInt(id) } });
      } catch (error) {
        console.log("🚀 ~ deleteUser:async ~ error:", error);
      }
    },
  },
  Subscription: {},
};

export default UserResolver;
