//get all users
async function get_all_users() {
    const req = await fetch('https://fakestoreapi.com/users');
    const res = await req.json();
    return res;
}

async function get_n_users(n) {
    const req = await fetch(`https://fakestoreapi.com/users/?limit=${n}`);
    const res = await req.json();
    return res;
}

export { get_all_users, get_n_users }