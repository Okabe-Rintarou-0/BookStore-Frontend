import { Card } from "antd";
import ApiDocs from "../components/api_docs";
import { BasicLayout } from "../components/layout";

export default function ApiPage() {
    return <BasicLayout>
        <Card className="card-container">
            <ApiDocs />
        </Card>
    </BasicLayout>
}