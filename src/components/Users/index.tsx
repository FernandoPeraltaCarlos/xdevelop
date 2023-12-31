import react,{useEffect, useState} from 'react';
import style from './style.module.scss'

import { get_all_users, add_user } from '../../API/users';

function Card ({id, names, mail, index, deleteUser, data}){

    function deleteOfList(){
        deleteUser(index)
    }

    delete data.username;
    delete data.password;

    return(
        <li className={style.card}>
            <p>{id}</p>
            <div>
                <p>{names.firstname} {names.lastname}</p>
                <p>{mail}</p>
            </div>
            <a href={`/users/${id}?data=${JSON.stringify(data)}`}>Ver mas</a>
            <p onClick={deleteOfList}>X</p>
        </li>
    )
}

function Users (){
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [sortId, setSortId] = useState(true);
    const [sortEmail, setSortEmail] = useState(true);


/* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is used to fetch all users from an API and update the state variables `users` and `originalUsers` with the fetched data. */
    useEffect(()=>{
        async function getAllUsers (){
            const data = await get_all_users();
            setUsers([...data])
            setOriginalUsers([...data]);
        }

        getAllUsers();
    },[])

    useEffect(()=>{
        const data = users;
    },[users])

/* The function `sortByID` sorts an array of users by their ID in ascending or descending order and updates the state with the sorted array. */
    function sortByID (){
        let usersCopy = structuredClone(users);
        if(sortId){
            usersCopy.sort((a,b) => {return b.id - a.id})
        }else{
            usersCopy.sort((a,b) => {return a.id - b.id})
        }
        setSortId(!sortId);
        setUsers([...usersCopy])
    }

/*The function `sortByEmail` sorts an array of users by their email in ascending or descending order, toggling the sorting order each time it is called.*/
    function sortByEmail (){
        let usersCopy = structuredClone(users);
        if(sortEmail){
            usersCopy.sort((a,b) => {
                if(a.email < b.email){
                    return -1;
                }else if(a.email > b.email){
                    return 1
                }
            })
        }else{
            usersCopy.sort((a,b) => {
                if(a.email < b.email){
                    return 1;
                }else if(a.email > b.email){
                    return -1
                }
            })
        }
        setSortEmail(!sortEmail);
        setUsers([...usersCopy])
    }

/**The deleteUser function removes a user from an array of users and updates the state with the updated array.@param index - The index parameter represents the index of the user that needs to be deleted from the users array.*/
    function deleteUser (index){
        let userCopy = structuredClone(users);
        userCopy.splice(index,1)
        setUsers([...userCopy])
    }

/* The function "reset" sets the state of users to its original value.*/
    function reset(){
        setUsers(originalUsers);
    }

    async function addUser (){
        let usersCopy = [...users];
        const newUser = await add_user();
        setUsers([...usersCopy, newUser]);
    }

    return(
        <section className={style.users}>
            <div className={style.orderList}>
                <p onClick={sortByID} >Ordenar por Id</p>
                <p onClick={sortByEmail} >Ordenar por Correo</p>
                <p onClick={reset}>Reiniciar</p>
                <p onClick={addUser} >Agregar usuario</p>
            </div>
            <ul>
                {
                    users.length === 0 ?
                    <li>Cargando....</li>:
                    users.map((user,index)=>(
                        <Card key={user.id} 
                            data={user}
                            deleteUser={deleteUser} index={index} id={user.id} names={user.name} mail={user.email}/>
                    ))
                }
            </ul>
        </section>
    )
}

export default Users