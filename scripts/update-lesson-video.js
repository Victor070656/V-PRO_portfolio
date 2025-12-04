const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ikechukwuv052:Victormongo123@cluster0.qdpkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function updateLessonVideo() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Find the lesson
    const lessonId = '69312ff8c03127d03a3c193d';
    const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(lessonId) });
    
    console.log('Current lesson data:');
    console.log(JSON.stringify(lesson, null, 2));
    
    // Update with a sample YouTube video
    const sampleYouTubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with your actual video
    
    const result = await db.collection('lessons').updateOne(
      { _id: new ObjectId(lessonId) },
      { 
        $set: { 
          videoUrl: sampleYouTubeUrl,
          updatedAt: new Date()
        } 
      }
    );
    
    console.log('\nUpdate result:', result);
    console.log(`\nLesson updated with video URL: ${sampleYouTubeUrl}`);
    console.log('\nIMPORTANT: Replace this with your actual YouTube or Google Drive video URL!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

updateLessonVideo();
