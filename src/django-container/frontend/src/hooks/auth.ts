import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import useTestAuth from "@dev/Auth.ts";

export default function useAuth() {
    return useTestAuth(); // TODO: remove this line in prod
    return useContext(AuthContext);
}
