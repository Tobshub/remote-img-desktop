const IS_DEV = import.meta.env.DEV;

const SERVER_URL = IS_DEV ? "http://localhost:4000" : "https://tobsmg.onrender.com";

export default SERVER_URL;
