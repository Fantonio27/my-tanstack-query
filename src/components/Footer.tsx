import { useEffect } from "react";
import { useUser } from "../hooks/query/users";

function Footer() {
  const { data: users, isPending: loading, refetch: refetchUsers } = useUser();

  useEffect(()=>{
    console.log(users)
  },[])
  return (
    <div>
      <h1>Footer Numnber of Users: {users?.length}</h1>
    </div>
  );
}

export default Footer;
