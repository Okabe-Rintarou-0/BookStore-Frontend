import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import BookPage from "../page/book";
import CartPage from "../page/cart";
import OrderPage from "../page/order";
import RankPage from "../page/rank";
import ApiPage from "../page/api";
import ProfilePage from "../page/profile";
import OtherUserProfilePage from "../page/other_profile";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<OtherUserProfilePage />} />
            <Route path="/api-docs" element={<ApiPage />} />
            <Route path="/*" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
}