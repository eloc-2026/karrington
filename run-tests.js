#!/usr/bin/env node

/**
 * Test Runner - Execute integration tests
 *
 * Usage: node run-tests.js
 */

console.log('🧪 Running Integration Tests...\n');

// Import and run tests
import('./tests/playability.test.js')
  .then(() => {
    console.log('✅ All tests completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test execution failed:');
    console.error(error);
    process.exit(1);
  });
