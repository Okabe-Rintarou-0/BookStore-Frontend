import { List, Avatar } from "antd"

export default function OrderItemList({ orderItems }) {
    return <List
        dataSource={orderItems}
        renderItem={(item, _) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={80} src={item.book.cover} />}
                    title={item.book.title}
                    description={`数量：${item.number}`}
                />
            </List.Item>
        )}
    />
}