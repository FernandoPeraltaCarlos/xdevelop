async function get_all_products() {
    const req = await fetch('https://fakestoreapi.com/products');
    const res = await req.json();
    return res;
}

export { get_all_products }