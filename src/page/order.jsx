import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/order_table";
import { getOrders } from "../service/order";

export function OrderPage() {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return <PrivateLayout>
        <Card>
            <OrderTable orders={orders} />
        </Card>
    </PrivateLayout>
}