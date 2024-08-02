import { Card, Space } from "antd";
import { BasicLayout } from "../components/layout";

export default function CoursePage() {
    return <BasicLayout>
        <Card className="card-container">
            <Space direction="vertical" style={{ width: "100%" }} size={2}>
                <h3>技术栈</h3>
                <ul>
                    <li>
                        前端：React, HTML, Javascript/Typescript, CSS
                    </li>
                    <li>
                        后端：Java, Spring Boot
                    </li>
                    <li>
                        数据库：MySQL, MongoDB, Neo4j
                    </li>
                </ul>
                <h3>课程要求</h3>
                <iframe src="requirements.pdf" width="100%" height="600px" />
            </Space>
        </Card >
    </BasicLayout >
}