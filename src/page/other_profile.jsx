import { useParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import OtherUserProfile from "../components/other_user_profile";

export default function OtherUserProfilePage() {
    const { id } = useParams();

    return <PrivateLayout>
        <OtherUserProfile userId={id} />
    </PrivateLayout>
}