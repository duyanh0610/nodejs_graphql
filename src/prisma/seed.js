import prisma from "../db/prisma.js";

async function main() {
  const addressInitialization = await prisma.address.createMany({
    data: [
      {
        addressDescription: "address 1",
      },
      {
        addressDescription: "address 2",
      },
      {
        addressDescription: "address 3",
      },
      {
        addressDescription: "address 4",
      },
      {
        addressDescription: "address 5",
      },
      {
        addressDescription: "address 6",
      },
    ],
  });

  const userInitialization = await prisma.user.createMany({
    data: [
      {
        name: "Duy Anh",
        email: "anhvdd@hblab.vn",
        password: "123456",
        addressId: 1,
      },
      {
        name: "Duy Anh1",
        email: "anhvdd1@hblab.vn",
        password: "123456",
        addressId: 1,
      },
      {
        name: "Duy Anh2",
        email: "anhvdd2@hblab.vn",
        password: "123456",
        addressId: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
