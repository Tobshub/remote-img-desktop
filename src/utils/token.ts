const TOKEN_NAME = "tobsmg-desktop-token";

const clientToken = {
  // set token
  set: (token: string) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
    return token;
  },
  // get token
  get: () => {
    let token = localStorage.getItem(TOKEN_NAME);
    if (!token) return null;
    token = JSON.parse(token) as string;
    return token;
  },
  // delete token
  delete: () => {
    let token = localStorage.getItem(TOKEN_NAME);
    if (!token) return null;
    localStorage.removeItem(TOKEN_NAME);
    token = JSON.parse(token) as string;
    return token;
  },
};

export default clientToken;
