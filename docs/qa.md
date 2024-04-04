+ Q: 我的登录页面那边一直登不进去?
  
    A: [github discussions](https://github.com/Okabe-Rintarou-0/BookStore-Frontend/discussions) 有相关问题说明 

+ Q: 如何在 React 正确引入图片?
  
    A: 见 [在 React 中引入图片](https://codesandbox.io/p/sandbox/example-3-image-import-gw2h7w?file=%2Fsrc%2FApp.tsx%3A28%2C14-36%2C13)

+ Q: 老师给的样例我启动不了，se2321_03_css3这个摸索着，然后跑不起来?

    A: 这个例子都是静态的，不用 node。

+ Q: 我现在做的web是这样还是simple的, 以后如果要改变可以吗?例如改颜色?
  
    A: 样式按照你喜欢的来，不要太另类就行。

+ Q: 如果直接用react框架搭建前端页面 第一次作业以什么格式提交呢？ 把react应用打包提交吗?

    A: 打包项目，不要包含node modules。

+ Q: intellij的license是自己去申请吗？

    A: idea 是可以免费用的：http://lic.si.sjtu.edu.cn/Default/huatishow/tag/MDAwMDAwMDAwMLJ4iqE 。

+ Q: 第一次迭代必须要用ant design吗？

    A: 用ant design开发相对省力，不是强制性。你也可以使用其他组件库，例如 MUI。

+ Q: 我在springboot里写了一个响应函数，并且在浏览器里能正确响应，但是我在前端中写的请求代码却不能正确执行?

    A: 跨域问题。

+ Q: 作业2的书店可以直接连提供的后端吗?

    A: 你可以直接利用我们给的后端来开发你的前端，我们欢迎、支持这么做。
    
+ Q: 为什么 useEffect 执行了两次：

  useEffect 在严格模式下会执行两次，以便于发现是否有不该出现的副作用（两次执行应该一致），这是在开发模式才会有，生产模式就不会。一种做法是干脆注释掉 StrictMode，一种就是避免副作用。

  参考：
  https://segmentfault.com/q/1010000042223485?utm_source=sf-similar-question


+ Q: 我从作业1都用了Next ReactJS 里的App Router和Material UI，功能都与之前的需求实现好了，我这里还需要改成React Router和Ant Design吗？

    A: 不需要修改，本身框架不需要绑定。但是压根不用react用vue不可以，这样和我们上课内容差距太大了。

+ Q: 为什么读取不到 `myLayout` 的值呢

    ```javascript
    return (
        <myLayout>
            ...
        </myLayout>
    )
    ```

    A: 自己写的组件需要首字母大写，以与原生标签作区分。

+ Q: 为什么还是读不到？

    ```javascript
    return 
    (
        <myLayout>
            ...
        </myLayout>
    )
    ```

    A: 不需要圆括号，并且要放在 return 后面，不用换行。原因是 js这东西其实换行了就算一个语句，分号不是必须的。
