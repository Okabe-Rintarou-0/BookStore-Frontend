export default function UsernameAvatar({ username }) {
    const firstChar = [...username].slice(0)[0];
    return <div style={{
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#1DA57A',
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    }}>
        {firstChar}
    </div>
}