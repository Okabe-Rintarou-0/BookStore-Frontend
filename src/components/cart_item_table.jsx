import { Button, Col, Image, Row, Table, InputNumber } from "antd";
import { changeCartItemNumber, deleteCartItem } from "../service/cart";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useEffect, useState } from "react";
import PlaceOrderModal from "./place_order_modal";

export default function CartItemTable({ cartItems, onMutate }) {
    const [messageApi, contextHolder] = useMessage();
    const [items, setItems] = useState(cartItems);
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleDeleteItem = async (id) => {
        let res = await deleteCartItem(id);
        handleBaseApiResponse(res, messageApi, onMutate);
    }

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => item.book.price * item.number);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) / 100 : 0;
    }

    const handleNumberChange = async (id, number) => {
        let res = await changeCartItemNumber(id, number);
        if (res.ok) {
            items.filter(item => item.id === id)[0].number = number;
            let filtered = selectedItems.filter(item => item.id === id);
            if (filtered.length === 1) {
                filtered[0].number = number;
                setSelectedItems([...selectedItems]);
            }
            setItems([...items]);
        }
    }

    const columns = [
        {
            title: '书名', dataIndex: 'book', key: 'book_title',
            render: book => book.title,
        },
        {
            title: '数量', dataIndex: 'number', key: 'number',
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.value} onChange={(newNumber) => {
                handleNumberChange(item.id, newNumber);
            }} />
        },
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

    const handleOrderSubmit = () => {
        setShowModal(false);
        onMutate();
    }

    return <>
        {contextHolder}
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} selectedItems={selectedItems} onOk={handleOrderSubmit} />}
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
            dataSource={items.map(item => ({
                ...item,
                key: item.id
            }))}
        />
        <p>总价：{computeTotalPrice()}元</p>
        <Button type="primary" disabled={selectedItems.length === 0}
            onClick={handleOpenModal}
        >立刻下单</Button>
    </>
}