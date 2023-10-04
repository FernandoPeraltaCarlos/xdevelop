import react,{useEffect, useState} from 'react';
import style from './style.module.scss'

import { get_all_users } from '../../API/users';

function Card ({id, names, mail}){
    return(
        <li className={style.card}>
            <p>{id}</p>
            <div>
                <p>{names.firstname} {names.lastname}</p>
                <p>{mail}</p>
            </div>
            <a href="#">Ver mas</a>
        </li>
    )
}

function Users (){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function getAllUsers (){
            const data = await get_all_users();
            setUsers([...data])
        }

        getAllUsers();
    },[])

    return(
        <section className={style.users}>
            <ul>
                {
                    users.length === 0 ?
                    <li>Cargando....</li>:
                    users.map(user=>(
                        <Card key={user.id} id={user.id} names={user.name} mail={user.email}/>
                    ))
                }
            </ul>
        </section>
    )
}

export default Users