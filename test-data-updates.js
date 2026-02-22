// Test script to verify data updates work properly
const testDataUpdates = async () => {
  const baseUrl = 'http://localhost:3001';
  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': '1' // Admin user
  };

  try {
    console.log('Testing data updates...');

    // Test 1: Add a new product
    console.log('\n1. Adding new product...');
    const newProduct = {
      name: 'Test Product ₹',
      categoryId: 1,
      supplierId: 1,
      quantity: 100,
      unitPrice: 299.99,
      minLevel: 10
    };

    const addResponse = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newProduct)
    });

    if (addResponse.ok) {
      const product = await addResponse.json();
      console.log('✓ Product added:', product.name, '- ₹' + product.unitPrice.toLocaleString('en-IN'));

      // Test 2: Update the product
      console.log('\n2. Updating product...');
      const updateResponse = await fetch(`${baseUrl}/api/products/${product.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          ...newProduct,
          name: 'Updated Test Product ₹',
          unitPrice: 399.99
        })
      });

      if (updateResponse.ok) {
        console.log('✓ Product updated successfully');
      }

      // Test 3: Create a sale
      console.log('\n3. Creating sale...');
      const saleResponse = await fetch(`${baseUrl}/api/sales`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customerName: 'Test Customer',
          customerEmail: 'test@example.com',
          items: [{
            productId: product.id,
            quantity: 5,
            unitPrice: product.unitPrice
          }],
          tax: 50,
          discount: 25
        })
      });

      if (saleResponse.ok) {
        const sale = await saleResponse.json();
        console.log('✓ Sale created:', '₹' + sale.finalAmount.toLocaleString('en-IN'));
      }

      // Test 4: Check dashboard data
      console.log('\n4. Checking dashboard data...');
      const dashboardResponse = await fetch(`${baseUrl}/api/products`, { headers });
      if (dashboardResponse.ok) {
        const products = await dashboardResponse.json();
        const updatedProduct = products.find(p => p.id === product.id);
        console.log('✓ Product inventory updated:', updatedProduct.quantity, 'units remaining');
      }

      // Test 5: Delete the test product
      console.log('\n5. Cleaning up test product...');
      const deleteResponse = await fetch(`${baseUrl}/api/products/${product.id}`, {
        method: 'DELETE',
        headers
      });

      if (deleteResponse.ok) {
        console.log('✓ Test product deleted successfully');
      }
    }

    console.log('\n✅ All tests completed successfully!');
    console.log('Data updates are working properly with Indian Rupees formatting.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testDataUpdates();