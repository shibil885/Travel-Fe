import { AdminReduce } from "./admin/admin.reducer";
import { UserReducer } from "./user/user.reducer";

export const AppState = {
    user: UserReducer,
    admin: AdminReduce
}