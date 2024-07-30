import { Button, Col, Image, Row, Space, Tag } from "antd";
import { Divider, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography;

export default function BookDetails({ book, onAddCartItem }) {
    return <Row>
        <Col span={9}>
            <Image src={book.cover} height={500} />
        </Col>
        <Col span={15}>
            <Typography>
                <Title>{book.title}</Title>
                <Divider orientation="left">基本信息</Divider>
                <Space>
                    <Paragraph>
                        {`作者：${book.author}`}
                        <Divider type="vertical" />
                        {`销量：${book.sales}`}
                        <Divider type="vertical" />
                        标签：{book.tags.map(t => <Tag>{t.name}</Tag>)}
                    </Paragraph>
                </Space>
                <Divider orientation="left">作品简介</Divider>
                <Paragraph>
                    {book.description}
                </Paragraph>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%" }}>
                        <Paragraph style={{ marginBottom: 0 }} type="secondary">抢购价</Paragraph>
                        <div><Space>
                            <div style={{ color: "#dd3735", fontSize: "16px" }}>¥</div>
                            <div style={{ color: "#dd3735", fontSize: "30px" }}>{book.price / 100}</div>
                            <div style={{ color: "#dd3735", fontSize: "18px" }}>（7折）</div>
                        </Space>
                        </div>
                        <div>
                            <Space>
                                <div style={{
                                    backgroundColor: "#f48484",
                                    padding: "0px 4px 0px 4px",
                                    borderRadius: "5px",
                                    color: "white"
                                }}>店铺促销</div>
                                <Paragraph style={{ marginBottom: 0 }} type="secondary">满¥18减¥1，满¥48减¥3，满¥98减¥5，满¥198减¥10</Paragraph>
                            </Space>
                        </div>
                        <Space>
                            <ExclamationCircleOutlined />
                            <Paragraph style={{ marginBottom: 0 }} type="secondary">部分促销不可共享，请以购物车能享受的促销为准</Paragraph>
                        </Space>
                    </div>
                    <Space>
                        <Button size="large" onClick={onAddCartItem}>加入购物车</Button>
                        <Button type="primary" size="large">立即购买</Button>
                    </Space>
                </Space>
            </Typography>
        </Col>
    </Row>
}