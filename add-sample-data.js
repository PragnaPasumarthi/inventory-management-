const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addSampleData() {
  try {
    console.log('Adding sample data...');

    // Add Categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: { name: 'Electronics', description: 'Electronic devices and accessories' }
      }),
      prisma.category.upsert({
        where: { name: 'Stationery' },
        update: {},
        create: { name: 'Stationery', description: 'Office and school supplies' }
      }),
      prisma.category.upsert({
        where: { name: 'Books' },
        update: {},
        create: { name: 'Books', description: 'Educational and reference books' }
      })
    ]);

    // Add Suppliers
    const suppliers = await Promise.all([
      prisma.supplier.upsert({
        where: { name: 'TechCorp India' },
        update: {},
        create: { 
          name: 'TechCorp India', 
          email: 'raj@techcorp.in',
          phone: '+91-9876543210',
          address: 'Mumbai, Maharashtra'
        }
      }),
      prisma.supplier.upsert({
        where: { name: 'Office Supplies Ltd' },
        update: {},
        create: { 
          name: 'Office Supplies Ltd', 
          email: 'priya@officesupplies.in',
          phone: '+91-9876543211',
          address: 'Delhi, India'
        }
      }),
      prisma.supplier.upsert({
        where: { name: 'BookWorld Publishers' },
        update: {},
        create: { 
          name: 'BookWorld Publishers', 
          email: 'amit@bookworld.in',
          phone: '+91-9876543212',
          address: 'Bangalore, Karnataka'
        }
      })
    ]);

    // Add Products
    const products = [];
    
    const product1 = await prisma.product.create({
      data: {
        name: 'Wireless Mouse',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        userId: 1,
        quantity: 50,
        unitPrice: 899.99,
        minLevel: 10
      }
    });
    products.push(product1);
    
    const product2 = await prisma.product.create({
      data: {
        name: 'Bluetooth Keyboard',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        userId: 1,
        quantity: 30,
        unitPrice: 2499.99,
        minLevel: 5
      }
    });
    products.push(product2);
    
    const product3 = await prisma.product.create({
      data: {
        name: 'A4 Notebook',
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
        userId: 1,
        quantity: 100,
        unitPrice: 149.99,
        minLevel: 20
      }
    });
    products.push(product3);
    
    const product4 = await prisma.product.create({
      data: {
        name: 'Blue Pen Set',
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
        userId: 1,
        quantity: 200,
        unitPrice: 99.99,
        minLevel: 50
      }
    });
    products.push(product4);
    
    const product5 = await prisma.product.create({
      data: {
        name: 'JavaScript Guide',
        categoryId: categories[2].id,
        supplierId: suppliers[2].id,
        userId: 1,
        quantity: 25,
        unitPrice: 1299.99,
        minLevel: 5
      }
    });
    products.push(product5);

    // Add Sales
    const sales = await Promise.all([
      prisma.sale.create({
        data: {
          customerName: 'Rahul Verma',
          customerEmail: 'rahul@example.com',
          userId: 1,
          total: 3399.97,
          tax: 169.99,
          discount: 100.00,
          finalAmount: 3469.96,
          saleItems: {
            create: [
              {
                productId: products[0].id,
                quantity: 2,
                unitPrice: 899.99,
                total: 1799.98
              },
              {
                productId: products[3].id,
                quantity: 16,
                unitPrice: 99.99,
                total: 1599.84
              }
            ]
          }
        }
      }),
      prisma.sale.create({
        data: {
          customerName: 'Sneha Patel',
          customerEmail: 'sneha@example.com',
          userId: 1,
          total: 2649.98,
          tax: 132.49,
          discount: 50.00,
          finalAmount: 2732.47,
          saleItems: {
            create: [
              {
                productId: products[1].id,
                quantity: 1,
                unitPrice: 2499.99,
                total: 2499.99
              },
              {
                productId: products[2].id,
                quantity: 1,
                unitPrice: 149.99,
                total: 149.99
              }
            ]
          }
        }
      })
    ]);

    // Update product quantities after sales
    await prisma.product.update({
      where: { id: products[0].id },
      data: { quantity: { decrement: 2 } }
    });
    await prisma.product.update({
      where: { id: products[1].id },
      data: { quantity: { decrement: 1 } }
    });
    await prisma.product.update({
      where: { id: products[2].id },
      data: { quantity: { decrement: 1 } }
    });
    await prisma.product.update({
      where: { id: products[3].id },
      data: { quantity: { decrement: 16 } }
    });

    console.log('✅ Sample data added successfully!');
    console.log(`📦 Categories: ${categories.length}`);
    console.log(`🏢 Suppliers: ${suppliers.length}`);
    console.log(`📱 Products: ${products.length}`);
    console.log(`💰 Sales: ${sales.length}`);
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleData();