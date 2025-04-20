import { useQuery } from "@tanstack/react-query";
import { userService } from "../../data/users";
 
export const useUser = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: userService.getUsers,
      staleTime: 1000,
    });
}