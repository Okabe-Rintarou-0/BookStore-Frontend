import ApiDocs from "../components/api_docs";
import { PrivateLayout } from "../components/layout";

export default function ApiPage() {
    return <PrivateLayout>
        <ApiDocs />
    </PrivateLayout>
}