import mongoose from 'mongoose';

class DbConnection {
  private url?: string;

  async connect(url: string): Promise<void> {
    try {
      this.url = url;
      // 4. Connect to MongoDB
      await mongoose
        .connect(url)
        .then(() => console.log('Connected to mongoDB'));
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect(url: string): Promise<void> {
    this.url = url;
    // disconnect to MongoDB
    await mongoose.connection.close();
  }
}

export default new DbConnection();
