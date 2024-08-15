import { subscribe } from "graphql";
import prisma from "../../db/prisma.js";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();
const UserResolver = {
  Query: {
    findUsers: async (root, args, context, info) => {
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
        const result = await prisma.user
          .create({ data: input })
          .then((result) => {
            const newAddedUser = { ...result._doc };

            pubSub.publish("NEW_USER", { newAddedUser });

            return newAddedUser;
          });
        return result;
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
  Subscription: {
    newUser: {
      resolve: (payload) => {
        return payload.newAddedUser;
      },
      subscribe: () => {
        return pubSub.asyncIterator("NEW_USER");
      },
    },

    editUser: {
      resolve: (payload) => {
        return payload.editedUser;
      },
      subscribe: () => {
        return pubSub.asyncIterator("EDIT_USER");
      },
    },

    deleteUser: {
      resolve: (payload) => {
        return payload.deletedUser;
      },
      subscribe: () => {
        return pubSub.asyncIterator("DELETE_USER");
      },
    },
  },
};

export default UserResolver;
