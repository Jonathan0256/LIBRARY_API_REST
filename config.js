import dotenv from "dotenv";

dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.SECRET_KEY,
  },
};

export default config;
