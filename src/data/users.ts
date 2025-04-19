export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  [key: string]: string | number;
};

export const userService = {
  getUsers: async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = response.json();

    return data;
  },
  postUser: async (user: User) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = response.json();

    return data;
  },
};
