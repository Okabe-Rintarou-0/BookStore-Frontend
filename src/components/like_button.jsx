import { Space } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function LikeButton({ defaultNumber, liked, onLike, onUnlike }) {
    const [isLiked, setIsLiked] = useState(liked);
    const [number, setNumber] = useState(defaultNumber);
    useEffect(() => {
        setIsLiked(liked);
        setNumber(defaultNumber);
    }, [liked, defaultNumber]);

    const handleLikeOrUnlike = async (e) => {
        e.preventDefault();
        if (!isLiked) {
            if (await onLike?.()) {
                setIsLiked(true);
                setNumber(number => number + 1);
            }
        } else if (await onUnlike?.()) {
            setIsLiked(false);
            setNumber(number => number - 1);
        }
    }

    return <Space size="small">
        <a onClick={handleLikeOrUnlike}>
            {isLiked && <LikeFilled />}
            {!isLiked && <LikeOutlined />}
        </a>
        {number}
    </Space>
} 