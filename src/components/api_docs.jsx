import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { API_DOCS_URL } from "../service/common"

export default function ApiDocs() {
    return <SwaggerUI url={API_DOCS_URL} />
}