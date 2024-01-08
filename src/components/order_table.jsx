import { Table } from "antd";
import useMessage from "antd/es/message/useMessage";
import OrderItemList from "./order_item_list";


export default function OrderTable({ orders }) {
    const [messageApi, contextHolder] = useMessage();
    const columns = [
        { title: '收货人', dataIndex: 'receiver', key: 'receiver', },
        { title: '联系方式', dataIndex: 'tel', key: 'tel', },
        { title: '收货地址', dataIndex: 'address', key: 'address', },
    ];

    return <>
        {contextHolder}
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (order) => (
                    <OrderItemList orderItems={order.items} />
                ),
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
        />
    </>
}