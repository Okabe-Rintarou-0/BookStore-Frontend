import { useMemoizedFn } from 'ahooks';
import { Button, Card, Space, Switch } from 'antd';
import { useEffect, useMemo, useState } from 'react';
interface ChildComponentProps {
    onChange: () => void;
}

function sleep(time: number) {
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while (true) {
        if (new Date().getTime() > endTime) {
            return;
        }
    }
}

const ChildComponent = (props: ChildComponentProps) => {
    const [propsChangeCnt, setPropsChangeCnt] = useState<number>(0);
    useEffect(() => {
        setPropsChangeCnt(cnt => cnt + 1);
    }, [props.onChange]);

    const doSomethingSlowly = () => {
        sleep(500);
        return Math.random();
    };

    const cnt = doSomethingSlowly();

    return <Space>
        <p>运行结果: {cnt}</p>
        <p>Props 变更次数: {propsChangeCnt}</p>
        <Button onClick={props.onChange}>按下按钮</Button>
    </Space>
}

const OptimizedChildComponent = (props: ChildComponentProps) => {
    const [propsChangeCnt, setPropsChangeCnt] = useState<number>(0);
    useEffect(() => {
        setPropsChangeCnt(cnt => cnt + 1);
    }, [props.onChange]);

    const doSomethingSlowly = () => {
        sleep(500);
        return Math.random();
    };

    const cnt = useMemo(() => doSomethingSlowly(), []);

    return <Space>
        <p>运行结果: {cnt}</p>
        <p>Props 变更次数: {propsChangeCnt}</p>
        <Button onClick={props.onChange}>按下按钮</Button>
    </Space>
}

export default function Case3() {
    const [cnt, setCnt] = useState<number>(0);
    const [optCnt, setOptCnt] = useState<number>(0);
    const [optimize, setOptimize] = useState<boolean>(false);
    const onChange = () => { setCnt(cnt => cnt + 1) };
    const optimizedOnChange = useMemoizedFn(() => { setOptCnt(cnt => cnt + 1) });
    return <Card title='案例3' extra={<Switch checkedChildren="关闭优化" unCheckedChildren="开启优化" onChange={setOptimize} />}>
        <Space style={{ width: "100%" }} direction='vertical'>
            {
                !optimize && <><p>按下按钮{cnt}次</p>
                    <ChildComponent onChange={onChange} />
                </>
            }
            {
                optimize && <><p>按下按钮{optCnt}次</p>
                    <OptimizedChildComponent onChange={optimizedOnChange} />
                </>
            }
        </Space>
    </Card>
}