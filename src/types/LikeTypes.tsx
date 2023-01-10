import { UserType } from "./UserTypes";

export interface LikeType extends UserType {
    id: number,
    user_id: number,
    target_id: number,
    compatibility: number,
    created_at: Date,
    updated_at: Date,
} 