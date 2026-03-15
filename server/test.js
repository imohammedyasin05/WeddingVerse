const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        services: true,
      },
      orderBy: { avg_rating: 'desc' },
    });
    console.log("Found vendors:", vendors.length);
  } catch (error) {
    console.error("PRISMA ERROR:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
