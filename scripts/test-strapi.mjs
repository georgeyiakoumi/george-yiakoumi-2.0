import { config } from 'dotenv';
config({ path: '.env.local' });

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

console.log('Testing Strapi Connection...\n');
console.log('API URL:', STRAPI_API_URL);
console.log('Token configured:', STRAPI_API_TOKEN ? 'Yes' : 'No');
console.log('\n---\n');

async function testConnection() {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    console.log('Testing basic connection...');
    const response = await fetch(`${STRAPI_API_URL}/api`, { headers });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log('✓ Connection successful\n');

    console.log('Testing About Page endpoint...');
    const aboutResponse = await fetch(`${STRAPI_API_URL}/api/about-page?populate=*`, { headers });

    if (aboutResponse.ok) {
      const data = await aboutResponse.json();
      console.log('✓ About Page found');
      console.log('  Title:', data.data?.attributes?.title || 'N/A');
    } else if (aboutResponse.status === 404) {
      console.log('⚠ About Page not found (create it in Strapi)');
    } else {
      console.log('✗ About Page error:', aboutResponse.status);
    }

    console.log('\nTesting Projects endpoint...');
    const projectsResponse = await fetch(`${STRAPI_API_URL}/api/projects?populate=*`, { headers });

    if (projectsResponse.ok) {
      const data = await projectsResponse.json();
      const count = data.data?.length || 0;
      console.log(`✓ Projects found: ${count}`);
      if (count > 0) {
        console.log('  First project:', data.data[0].attributes.title);
      }
    } else if (projectsResponse.status === 404) {
      console.log('⚠ Projects not found (create collection type in Strapi)');
    } else {
      console.log('✗ Projects error:', projectsResponse.status);
    }

    console.log('\nTesting Contact Info endpoint...');
    const contactResponse = await fetch(`${STRAPI_API_URL}/api/contact-info`, { headers });

    if (contactResponse.ok) {
      const data = await contactResponse.json();
      console.log('✓ Contact Info found');
      console.log('  Email:', data.data?.attributes?.email || 'N/A');
    } else if (contactResponse.status === 404) {
      console.log('⚠ Contact Info not found (create it in Strapi)');
    } else {
      console.log('✗ Contact Info error:', contactResponse.status);
    }

    console.log('\n✅ Testing complete!');

  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Is Strapi running? Check http://localhost:1337/admin');
    console.log('2. Is your .env.local configured correctly?');
    console.log('3. Is the API token valid?');
    process.exit(1);
  }
}

testConnection();
