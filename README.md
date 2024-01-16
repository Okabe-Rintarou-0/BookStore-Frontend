# 电子书城前端

该 repo 为上海交通大学课程“互联网应用开发技术(SE2321)” 的前端 demo 项目，供同学们学习参考。

UI 设计上，在不删减基本功能的前提下，保证尽可能的简洁明了。

<div align="center">
    <img src="images/login.png" style="width: 48%;">
    <img src="images/home.png" style="width: 48%; margin-right: 2%;">
</div>

<p align="center">
  <img align="center" src="https://img.shields.io/badge/node-21.x-blue">
    <img align="center" src="https://img.shields.io/badge/jdk-17-blue">
  <img align="center" src="https://img.shields.io/github/issues/Okabe-Rintarou-0/BookStore-Frontend" /> 
  <img align="center" src="https://img.shields.io/github/contributors/Okabe-Rintarou-0/BookStore-Frontend" />
  <img align="center" src="https://img.shields.io/github/stars/Okabe-Rintarou-0/BookStore-Frontend" /> 
</p>

## 环境配置

请下载最新版本的 node(21.x)。如果你学过 python 的话，你应该清楚 pip 是一个功能强大的包管理器。与其类似，你可以选择 `npm` 或者 `yarn` 作为 node 的包管理器。

通过以下命令，你可以轻松启动前端项目（推荐）：
```bash
# 使用 npm
npm install && npm start

# 使用 yarn
yarn install && yarn start
```

或者，使用 `Docker` 一键部署（仅测试用）：
```bash
docker run -itd -e REACT_APP_BASE_URL=后端服务器URL -p 3000:3000 --name bookstore-frontend 923048992/frontend
```

如果你使用的是 macos，请使用 `923048992/frontend:mac` 镜像。

## 后端 API

我们开源了完整的前端项目，但是为了防止同学们照抄后端代码，所以只提供了后端 API 及其文档（你可以在启动前端后在 http://localhost:3000/api-docs 查看文档）。后端 API 采用 [RESTful](https://zhuanlan.zhihu.com/p/334809573) 形式。请在 `.env` 文件中修改环境变量 `REACT_APP_BASE_URL` 的值为我们提供的后端服务器的 URL。

## 学习指南
本课程主要学习 `React` 框架，学有余力的同学也可以尝试一下 `Vue`。

如果你想参与问题、技术讨论，欢迎使用本 repo 的讨论模块：https://github.com/Okabe-Rintarou-0/BookStore-Frontend/discussions 。

### 函数式组件
React 使用 JSX 来定义组件，支持两种方式：类组件和函数式组件。由于便利性，现在大家倾向于使用后者进行开发。函数式组件最令人头疼的就是各种 hooks（钩子函数）。所以学会各种 hooks 的用法是学好 React 的关键。

+ [useState](https://legacy.reactjs.org/docs/hooks-state.html): 
  
    State 是 React 中最核心的理念。当一个组件的状态发生改变的时候，React 会对其进行重新渲染。当我们希望进行**交互**，或者是渲染**动态**组件，我们就会用到状态。useState 会返回一个数组，第一个元素是状态变量。第二个则是设置该状态变量的函数（详见链接）。

    常见误区：
    + Q：为什么我修改了状态，但是页面没有重新渲染？
        ```javascript
        const [count, setCount] = useState(1);
        return <>
            <button onClick={()=>{count+=1;}}>Increase</button>
            <p>Count: {count}</p>
        </>
        ```
        A：只有通过 setCount 函数修改变量才会触发重新渲染。
    + Q：我明明用了 set 函数，为什么依然没有渲染？
        ```javascript
        const [tags, setTags] = useState([]);
        return <>
            <button onClick={()=>{
                tags.push("tag");
                setTags(tags);
            }}>Add tag</button>
            {tags.map(tag => (<p>{tag}</p>))}
        </>
        ```
        A：tags 的地址没有改变（数组和对象是引用类型），所以 React 认为它没有被修改。
        正确做法：
        
        ```javascript
        setTags([...tags, "tag"]);
        ```
+ [useEffect](https://legacy.reactjs.org/docs/hooks-effect.html)：提供生命周期管理、在依赖项修改时触发。
  
    如果你希望在组件挂载之后做一些事情（例如初始化工作），你可以将第二个参数依赖项设置为空数组，这样就等同于类组件的 `componentDidMount` 生命周期函数。
    ```javascript
    useEffect(()=>{
        // do something here
    }, []);
    ```
    > If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.

    如果你希望监视某些值的变化，那就加入到依赖项中（这一功能非常重要，你可以从链接中的例子看到这一点）：
    ```javascript
    useEffect(() => {
        // do something when someVar changes
    }, [someVar]);
    ```
    

    你可以返回一个函数用于进行组件 unmount 时的额外处理。
    ```javascript
    useEffect(() => {
        return () => {
            // do some cleanup here
        };
    });
    ```

    常见误区：
    + 死循环：
        以下代码将产生死循环，请注意依赖是否正确使用。
        ```javascript
        useEffect(() => {
            setSomeVar(newValue);
        }, [someVar]);
        ```
        在没有依赖情况下，如果你在 useEffect 中修改状态，就会触发再次渲染，useEffect 又会被调用，形成死循环。
        ```javascript
        useEffect(() => {
            setSomeVar(newValue);
        });
        ```
+ [useLocation](https://reactrouter.com/en/main/hooks/use-location)：获取前端当前 URL.
+ [useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)：获取 URL query 参数。
+ [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)：用于进行页面跳转。
+ [useParams](https://reactrouter.com/en/main/hooks/use-params)：获取 URL 路径参数（例如 "/path/:id"，你可以通过以下方式获取该参数）
    ```javascript
    const {id} = useParams(); 
    ```

### 异步函数
异步函数也是一大重点，建议大家学习好两种方式：**回调函数** 和 **await** 方式，本项目均采用后者，避免过多回调函数产生不美观和“回调地狱”。
可以参考：
+ https://juejin.cn/post/7108187709076111367

### 养成良好的习惯
+ 对于列表组件，每一项都需要 `key` 属性：https://zh-hans.legacy.reactjs.org/docs/lists-and-keys.html 。`key` 属性很重要，React 利用 key 来识别组件，它是一种身份标识标识，就像我们的身份证用来辨识一个人一样。每个 key 对应一个组件，相同的 key 会被认为是同一个组件，这样后续相同的 key 对应组件都不会被重新创建。
+ 善用浏览器开发者工具：控制台、网络...
+ 需要复用、较复杂的组件应进行封装，避免嵌套过深、重复编码。

## Tricks
+ 字符串格式化：

    ```javascript
    const num = 123;
    const str = `number is ${num}`;
    ```

    这将产生字符串"number is 123"。

+ 简洁的条件渲染
    
    ```javascript
    {shouldShow && <SomeComponent/>}
    ```
    `shouldShow` 是一个 bool 类型的变量，当且仅当其为真，渲染后面的组件。这种写法最为简洁，也不失可读性。

+ 便捷的函数式编程：
    
    基本上函数式都会支持 `map`、`filter` 和 `reduce` 操作。下面的代码将产生一系列组件。
    ```javascript
    function ArrayComponents({ array }) {
        return array.map(item => <div>{item}</div>);
    }    
    <ArrayComponents array={[1, 2, 3]}/>
    ```

    这三种函数非常常用，尤其是 `map`，请熟练掌握其用法，增加编程效率。

+ 箭头函数

    基本上可以完美代替 `function`，编码方便。注意返回类型如果是如下形式请加括号：

    ```javascript
    let func = book => ({
        id: book.id,
        title: book.title
    });
    ```

    正如上述例子所示，只有一个参数的情况下参数可以不加括号。

+ Javascript 中的 `...` 运算符：

    作用在数组上就是将数组解开：

    ```javascript
    let array = [1, 2, 3];
    let newArray = [..array, 4]; // [1, 2, 3, 4]
    ```

    作用在对象上：
    ```javascript
    let obj = {
        id: "1"
    };
    let newObj = {
        ...obj,
        name: "object"
    };
    ```
    等价于：
    ```javascript
    let newObj = {
        id: "1",
        name: "object"
    };
    ```
    顺带一提，如果变量和对象的 key 名字相同，则可以简化赋值表达：
    ```javascript
    let book = {
        title: "chiikawa"
    };
    let title = "chiikawa2";
    book = {
        title
    };
    ```

## 进阶
+ 使用 Typescript 代替 Javascript。
+ 使用 [useSWR](https://swr.vercel.app/zh-CN) + [axios](https://www.npmjs.com/package//axios) 代替 `fetch` 方案；
+ 使用 [React.createContext](https://zh-hans.react.dev/reference/react/createContext) 更方便地传递上下文。
