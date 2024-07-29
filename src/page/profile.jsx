import { PrivateLayout } from "../components/layout";
import UserProfile from "../components/user_profile";

export default function ProfilePage() {
    return <PrivateLayout>
        <UserProfile />
    </PrivateLayout>
}