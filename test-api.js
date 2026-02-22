const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const userCount = await prisma.user.count();
    console.log('Users in database:', userCount);
    
    const productCount = await prisma.product.count();
    console.log('Products in database:', productCount);
    
    // Test products query
    const products = await prisma.product.findMany({
      where: { userId: 1 },
      include: { 
        category: true,
        supplier: true
      }
    });
    
    console.log('Products for user 1:', products.length);
    console.log('Sample product:', products[0]);
    
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();