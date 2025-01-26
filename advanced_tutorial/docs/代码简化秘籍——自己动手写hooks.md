# 代码简化秘籍——自己动手写hooks

假设你已经理解了函数式组件常用的钩子函数，如 `useEffect`，`useState`。现在有一个使用场景，我希望使用一个 `radio`，实时获取它当前的值，并且能够通过函数来控制是否选中它，你会怎么做？

我猜你估计会使用下面的方法：

```typescript
export default function SomeComponent() {
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
    return <Space>
        <Radio checked={value} onClick={toggleRadio}>写法1</Radio>
        <Button onClick={toggleRadio}>翻转状态</Button>
        <Button onClick={selectRadio}>选中</Button>
        <Button onClick={cancelRadio}>取消</Button>
    </Space>
}
```

这么写当然是可以的，组件能够正常运行，同时也满足我们控制的需求。然而，为了实现这一功能，你定义了一个状态和一组回调函数，总共 **10** 行代码。试想一下，如果这个组件里面需要创建多个这样的 radio，你要怎么写？复制多份吗，状态冲突了怎么办？即便你只需要一个 radio，是否能够通过更好的方式进行封装，屏蔽上述的实现细节呢？当然可以，请大胆地使用 hooks（钩子函数），不仅仅局限于各种官方/第三方库中提供的 hooks，你也可以自己动手，丰衣足食😄。

你可以通过如下的钩子函数来简化和屏蔽实现细节：

```typescript
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
```

注意，我们一般使用 `useXXX` 来命名一个钩子函数，其中 `XXX` 通常为你希望获取的主体。例如我们这里需要一个可控的 radio，所以命名为 `useRadio`。

通过上述的钩子函数，我们可以将之前的代码简化为：
```typescript
const {
    MyRadio, toggle, select, cancel
} = useRadio();

<Space>
    <MyRadio>写法2</MyRadio>
    <Button onClick={toggle}>翻转状态</Button>
    <Button onClick={select}>选中</Button>
    <Button onClick={cancel}>取消</Button>
</Space>
```
是不是简化了特别多？你可以运行我们提供的教程项目（案例1），然后感受两种写法的不同。

现在，你遇到了另一个需求：你需要在前端请求一个耗时较长的接口，在请求开始后，你希望前端组件呈现加载中的状态，你会怎么做？回想一下前端如何请求后端？哦，你想起来了，可以用原生的 fetch 函数写出这样的钩子函数：

```typescript
function useData<T>(url: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const mutate = async () => {
        setLoading(true);
        try {
            const response = await fetch(url, { method: "GET" });
            if (!response.ok) {
                const error = Error(`HTTP error! status: ${response.status}`);
                setError(error);
                return;
            }
            const data = await response.json() as T;
            setData(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        mutate();
    }, [url]);
    return { data, loading, error, mutate }
}
```

在使用的时候，我们可以这样：
```typescript
const {
    data, loading, error, mutate
} = useData<DataType>("https://dogapi.dog/api/v2/breeds");
return <Card title='案例1' extra={<Button onClick={mutate}>刷新</   Button>}>
    <Space style={{ width: "100%" }} direction='vertical'>
        <Table dataSource={data?.data} loading={loading} columns={columns} />
    </Space>
</Card>
```

你还可以在此基础上添加一个 `mutate` 函数，当你进行一些数据修改，希望重新刷新数据的时候，可以调用这个暴露出来的 mutate 函数重新获取数据：

你可以在“案例2”中体验两种写法的区别。这里我们使用的是一个公开的 api(https://dogapi.dog/docs/api-v2) 。

当然，随着业务的发展，你可能还会有更多的需求，在这个 useData 上面新增更多的状态和配置。既然如此，**何必自己造轮子呢**？你完全可以用 `useSWR + axios` 这套方案，详见：useSWR 的官方文档：https://swr.vercel.app/zh-CN/docs/data-fetching ，此处不再赘述😁。

## 使用 useImmer 简化 state 更新

安装：
```shell
yarn add immer use-immer
```

假设你有这样的一个类型的数据：

```typescript
interface TagType {
    color: string;
    text: string;
}
```

你希望渲染出一堆 tags，并且按下按钮修改其中一个 tag 的 text，如果用原生的 `useState` 会这样写：

```typescript
const [tags, setTags] = useState<TagType[]>(generateTestTags());
const modify = () => {
    tags[randIndex].text = 'changed';
    setTags([...tags]);
};
```

由于 `useState` 监听的是一个数组（引用类型），所以浅拷贝是无法产生页面重渲染的，此处必须传递深拷贝，修改数组的地址，引发页面重渲染。然而，显而易见，这种方式一旦数组长度达到一定程度，性能开销将无法忽视。例如，在本案例中，我们渲染了 10000个标签。每次修改的时候，都会对这个大小为 10000 的数据进行深拷贝。

而 `useImmer` 则允许我们直接修改数组/对象的字段，无需进行深拷贝，节省性能并提升代码可读性：

```typescript
setOptTags(tags => { tags[randIndex].text = 'changed' });
```


