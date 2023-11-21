import app from './app';
import DBCONNECT from './database';

const PORT = process.env.PORT || 8000;

DBCONNECT(() => {
  app.listen(PORT, () => {
    console.log(`🔥 Server is running on port ${PORT}`);
  });
});