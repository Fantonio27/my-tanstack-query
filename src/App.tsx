import { use, useEffect, useState } from "react";
import "./App.css";
import { userService, type User } from "./data/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// function fetchUsers() {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState<Error>();

//   const fetch = async () => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 3000));

//       const response = await userService.getUsers();
//       setUsers(response);
//     } catch {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetch();
//   }, []);

//   return { users, loading, error, fetch};
// }

function App() {
  // const { users, loading, error, fetch} = fetchUsers();

  const [isHide, setIsHide] = useState(true);

  const {
    data: users,
    isPending: loading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    staleTime: 2000,
  });

  const { mutateAsync: createUserMutate, isPending } = useMutation({
    mutationFn: userService.postUser,
    onSettled: refetchUsers,
  });

  function handleClick() {
    const sampleUser = {
      id: users.length + 1,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
    };

    createUserMutate(sampleUser);
    // const run = async () => {

    //   const response = await userService.postUser(sampleUser);
    //   fetch()
    // };

    // run();
  }

  function handleShow() {
    refetchUsers();
  }

  return (
    <>
      <section>
        {!isHide ? <Header /> : <h1>User</h1>}
        <button onClick={() => setIsHide(!isHide)}>{isHide? "Show Users" : "Hide Users"}</button>
        <button onClick={handleClick}>Create User</button>
        <button onClick={handleShow}>Load</button>
      </section>

      {loading || isPending ? (
        <p>Loading...</p>
      ) : (
        users.map((user: User, index: number) => {
          return (
            <ul key={index}>
              {Object.keys(user).map((key, i) => (
                <li key={i}>{user[key]}</li>
              ))}
            </ul>
          );
        })
      )}
    </>
  );
}

function Header() {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: userService.getUsers });

  const queryClient = useQueryClient();

  function handleInvalidateUsers(){
    queryClient.resetQueries({queryKey: ["users"]})
  }

  return (
    <>
    <h1>Users Record ({users?.length})</h1>
    <button onClick={handleInvalidateUsers}>Invalidate Users</button>
    </>
  );
}

export default App;
