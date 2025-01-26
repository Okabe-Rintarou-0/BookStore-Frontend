import { Space } from 'antd'
import Case1 from './cases/case1'
import Case2 from './cases/case2'
import Case3 from './cases/case3'

function App() {
  return <Space style={{ width: "100%" }} direction='vertical'>
    <Case1 />
    <Case2 />
    <Case3 />
  </Space>
}

export default App
