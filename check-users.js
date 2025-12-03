const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Manually read .env.local or .env
try {
  let envPath = path.resolve(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    envPath = path.resolve(__dirname, '.env');
  }
  
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } else {
    console.log('No .env or .env.local file found');
  }
} catch (e) {
  console.log('Error reading env file:', e);
}

async function checkUsers() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    
    const students = await db.collection('students').find({}).toArray();
    console.log('Students:', students);

    const admins = await db.collection('users').find({}).toArray();
    console.log('Admins (users collection):', admins);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkUsers();
