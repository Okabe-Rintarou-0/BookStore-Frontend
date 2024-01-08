import { Button, Col, Image, Row, Table } from "antd";
import { deleteCartItem } from "../service/cart";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useState } from "react";

export default function CartItemTable({ cartItems, onMutate }) {
    const [messageApi, contextHolder] = useMessage();
    const [selectedItems, setSelectedItems] = useState([]);
    const handleDeleteItem = async (id) => {
        let res = await deleteCartItem(id);
        handleBaseApiResponse(res, messageApi, onMutate);
    }

    const prices = selectedItems.map(item => item.book.price);
    const totalPrice = prices.length > 0 ?
        prices.reduce((prev, cur) => prev + cur) / 100 : 0;

    const columns = [
        {
            title: '书名', dataIndex: 'book', key: 'book_title',
            render: book => book.title,
        },
        { title: '数量', dataIndex: 'number', key: 'number' },
        {
            title: '价格', dataIndex: 'book', key: 'book_price',
            render: book => book.price / 100
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'action',
            render: (item) => <Button type="primary" onClick={() => {
                handleDeleteItem(item.id);
            }}>删除</Button>,
        },
    ];

    return <>
        {contextHolder}
        <Table
            columns={columns}
            rowSelection={{
                onChange: (_, selectedItems) => {
                    setSelectedItems(selectedItems);
                },
            }}
            expandable={{
                expandedRowRender: (cartItem) => (
                    <Row justify={"space-between"} gutter={8}>
                        <Col span={4}>
                            <Image src={cartItem.book.cover} height={200} />
                        </Col>
                        <Col span={20}>
                            <p>{cartItem.book.description}</p>
                        </Col>
                    </Row>
                ),
            }}
            dataSource={cartItems.map(item => ({
                ...item,
                key: item.id
            }))}
        />
        <p>总价：{totalPrice}元</p>
        <Button type="primary" disabled={selectedItems.length === 0}>立刻下单</Button>
    </>
}