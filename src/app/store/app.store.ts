import { AdminReduce } from "./admin/admin.reducer";
import { AgencyReducer } from "./agency/agency.reducer";
import { UserReducer } from "./user/user.reducer";

export const AppState = {
    user: UserReducer,
    agency: AgencyReducer,
    admin: AdminReduce,
}