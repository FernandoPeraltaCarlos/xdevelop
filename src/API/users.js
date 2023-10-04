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

async function add_user() {

    let newUser = {
        email: 'John@gmail.com',
        username: 'johnd',
        password: 'm38rmF$',
        name: {
            firstname: 'John',
            lastname: 'Doe'
        },
        address: {
            city: 'kilcoole',
            street: '7835 new road',
            number: 3,
            zipcode: '12926-3874',
            geolocation: {
                lat: '-37.3159',
                long: '81.1496'
            }
        },
        phone: '1-570-236-7033'
    }

    const req = await fetch('https://fakestoreapi.com/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    });
    const res = await req.json();
    newUser.id = res.id;

    return newUser;
}

export { get_all_users, get_n_users, add_user }