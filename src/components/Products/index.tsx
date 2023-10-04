import react,{useEffect, useState} from 'react';
import style from './style.module.scss'

import { get_all_products } from '../../API/products.js';

function Card ({id, price, title, data}){

    return(
        <li className={style.card}>
            <p>{id}</p>
            <p>{price}</p>
            <div>
                <p>{title}</p>
            </div>
            <a href={`/products/${id}?data=${JSON.stringify(data)}`}>Ver mas</a>
        </li>
    )
}

function Products (){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function getAllProducts (){
            const data = await get_all_products();
            setProducts([...data])
        }

        getAllProducts();
    },[])


    return(
        <section className={style.products}>
            <ul>
                {
                    products.length === 0 ?
                    <li>Cargando....</li>:
                    products.map((product,index)=>(
                        <Card data={product} key={product.id} id={product.id} title={product.title} price={product.price}/>
                    ))
                }
            </ul>
        </section>
    )
}

export default Products