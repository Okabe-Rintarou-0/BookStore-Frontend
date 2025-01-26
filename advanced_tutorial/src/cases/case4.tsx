import { Button, Card, Space, Switch, Tag } from 'antd';
import { Profiler, useState } from 'react';
import { useImmer } from 'use-immer';
interface TagType {
    color: string;
    text: string;
    id: number;
}

function generateTestTags() {
    const tags = [];
    for (let i = 0; i < 10000; i++) {
        tags.push({
            id: i,
            color: 'green',
            text: 'not changed'
        })
    }
    return tags;
}

export default function Case4() {
    const [tags, setTags] = useState<TagType[]>(generateTestTags());
    const [optTags, setOptTags] = useImmer<TagType[]>([]);
    const [optimize, setOptimize] = useState<boolean>(false);
    const modify = () => {
        const randIndex = Math.floor(Math.random() * tags.length);
        if (optimize) {
            setOptTags(tags => { tags[randIndex].text = 'changed' });
        } else {
            tags[randIndex].text = 'changed';
            setTags([...tags]);
        }
    };
    const report = (id: string, phase: 'mount' | 'update' | 'nested-update', actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
        console.log(`${id}'s ${phase} phase:`);
        console.log(`Actual time: ${actualDuration}`);
        console.log(`Base time: ${baseDuration}`);
        console.log(`Start time: ${startTime}`);
        console.log(`Commit time: ${commitTime}`);
    }

    return <Card title='案例4' extra={<Space>
        <Button onClick={modify}>修改</Button>
        <Switch checkedChildren="关闭优化" unCheckedChildren="开启优化" onChange={(optimize) => {
            if (optimize) {
                setTags([]);
                setOptTags(generateTestTags());
            } else {
                setOptTags([]);
                setTags(generateTestTags());
            }
            setOptimize(optimize);
        }} />
    </Space>}>
        <Space style={{ width: "100%" }} direction='vertical'>
            <Space>
                {!optimize && <Profiler id={'original'} onRender={report}>
                    {tags.map(tag => <Tag key={tag.id} color={tag.color}>{tag.text}</Tag>)}
                </Profiler>}
                {optimize && <Profiler id={'original'} onRender={report}>
                    {optTags.map(tag => <Tag key={tag.id} color={tag.color}>{tag.text}</Tag>)}
                </Profiler>}
            </Space>
        </Space>
    </Card>
}