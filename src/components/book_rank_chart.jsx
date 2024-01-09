import { Column } from '@ant-design/plots';
export default function BookRankChart({ books }) {
    const data = books.map(book => ({
        sales: book.sales,
        title: book.title,
    }));
    const config = {
        data,
        xField: 'title',
        yField: 'sales',
        label: {
            position: 'top',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: true,
            },
        },
        meta: {
            title: {
                alias: '书名',
            },
            sales: {
                alias: '销量',
            },
        },
    };
    return <Column {...config} />;
}