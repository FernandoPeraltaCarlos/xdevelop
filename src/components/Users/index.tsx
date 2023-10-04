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
    const [originalUsers, setOriginalUsers] = useState([]);
    const [sortId, setSortId] = useState(true);

    useEffect(()=>{
        async function getAllUsers (){
            const data = await get_all_users();
            setUsers([...data])
            setOriginalUsers([...data]);
        }

        getAllUsers();
    },[])

    function sortByID (){
        let usersCopy = [...users];
        if(sortId){
            usersCopy.sort((a,b) => {return b.id - a.id})
        }else{
            usersCopy.sort((a,b) => {return a.id - b.id})
        }
        setSortId(!sortId);
        setUsers(usersCopy)
    }

    return(
        <section className={style.users}>
            <div className={style.orderList}>
                <p onClick={sortByID} >Ordenar por Id</p>
                <p>Ordenar por Correo</p>
            </div>
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