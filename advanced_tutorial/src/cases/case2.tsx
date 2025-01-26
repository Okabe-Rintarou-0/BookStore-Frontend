import { Button, Card, Space, Table } from "antd";
import { useEffect, useState } from "react";

function useData<T>(url: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const mutate = async () => {
        setLoading(true);
        try {
            const response = await fetch(url, { method: "GET" });
            if (!response.ok) {
                const error = Error(`HTTP error! status: ${response.status}`);
                setError(error);
                return;
            }
            const data = await response.json() as T;
            setData(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        mutate();
    }, [url]);
    return { data, loading, error, mutate }
}

const columns = [{
    title: "id",
    dataIndex: "id",
    key: "id",
}, {
    title: "type",
    dataIndex: "type",
    key: "type",
}, {
    title: "attributes",
    dataIndex: "attributes",
    key: "attributes",
    render: (data: any) => JSON.stringify(data)
}]

interface DataType {
    data: {
        id: string;
        name: string;
        data: any
    }[];
}

export default function Case2() {
    const {
        data, loading, mutate
    } = useData<DataType>("https://dogapi.dog/api/v2/breeds");
    return <Card title='案例2' extra={<Button onClick={mutate}>刷新</Button>}>
        <Space style={{ width: "100%" }} direction='vertical'>
            <Table rowKey={"id"} dataSource={data?.data.slice(0, 1)} loading={loading} columns={columns} />
        </Space>
    </Card>
}