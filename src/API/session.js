async function get_token(user, pass) {
    const req = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: pass
        })
    });
    const res = await req.json();
    return res;
}

export { get_token }