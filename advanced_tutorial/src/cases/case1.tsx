import { Button, Card, Radio, RadioProps, Space } from 'antd';
import { useState } from 'react';

function useRadio() {
    const [value, setValue] = useState<boolean>(false);
    const MyRadio = (props: RadioProps) => <Radio checked={value} onClick={toggle} {...props}></Radio>
    const toggle = () => {
        setValue(value => !value);
    }
    const select = () => {
        setValue(true);
    }
    const cancel = () => {
        setValue(false);
    }

    return {
        MyRadio, toggle, select, cancel
    }
}

export default function Case1() {
    const [value, setValue] = useState<boolean>(false);
    const toggleRadio = () => {
        setValue(value => !value);
    }
    const selectRadio = () => {
        setValue(true);
    }
    const cancelRadio = () => {
        setValue(false);
    }

    const {
        MyRadio, toggle, select, cancel
    } = useRadio();
    return <Card title='案例1'>
        <Space style={{ width: "100%" }} direction='vertical'>
            <Space>
                <Radio checked={value} onClick={toggleRadio}>写法1</Radio>
                <Button onClick={toggleRadio}>翻转状态</Button>
                <Button onClick={selectRadio}>选中</Button>
                <Button onClick={cancelRadio}>取消</Button>
            </Space>
            <Space>
                <MyRadio>写法2</MyRadio>
                <Button onClick={toggle}>翻转状态</Button>
                <Button onClick={select}>选中</Button>
                <Button onClick={cancel}>取消</Button>
            </Space>
        </Space>
    </Card>
}