# 后端开发指南

## 如何维护 Http Session

写一个 SessionUtils，框架帮你维护 Session 数据结构。JSESSIONID 对应一个 session，每个 session 都是一个类似 map 的 key-value 存储结构。

```java
public class SessionUtils {
    public static void setSession(UserAuth userAuth) {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (servletRequestAttributes != null) {
            HttpServletRequest request = servletRequestAttributes.getRequest();
            HttpSession session = request.getSession();
            session.setAttribute("userId", userAuth.getUserId());
            session.setAttribute("identity", userAuth.getIdentity());
        }
    }

    private static HttpSession getSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            return request.getSession(false);
        }
        return null;
    }
}
```