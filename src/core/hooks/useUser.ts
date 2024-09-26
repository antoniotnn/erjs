import { useCallback, useState } from "react";
import { User, UserService } from "tnn-sdk";
import useAuth from "./useAuth";

export default function useUser() {
    const [detailedUser, setDetailedUser] = useState<User.Detailed>();
    const { user } = useAuth();

    const fetchDetailedUser = useCallback(async function () {
        UserService.getDetailedUser(Number(user?.id))
            .then(setDetailedUser);
    }, []);

    return {
        user: detailedUser,
        fetchUser: fetchDetailedUser,
    };
}