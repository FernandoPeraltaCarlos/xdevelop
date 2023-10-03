import react,{useState, useEffect, useRef} from 'react';
import style from './style.module.scss';
import styled from 'styled-components';

import { get_token } from '../../API/session'

type Styled = {
    'data-active': string;
}

let UserAlert = styled.p<Styled>`
    display: ${props => props['data-active'] === 'true' ? 'block' : 'none'};
    color:red;
    font-size: clamp(0.6rem, 100vw, 0.8rem);
`

function Form (){
    const [user, setUser] = useState<string>('');
    const [pass,setPass] = useState<string>('');
    const [validUser, setValidUser] = useState<string>('false');

    let User = useRef(null);
    let Pass = useRef(null);

    async function Session (e){
        e.preventDefault();
        try{
            const res =await get_token(user,pass);
            localStorage.setItem('token',res);
            setValidUser('false')
            window.location.href = '/users';
        }catch(err){
            console.log('Usuario no valido')
            setValidUser('true');
            User.current.value = '';
            Pass.current.value = '';
        }
    }

    function userInput(e){
        if(e.target.name === 'user'){
            setUser(e.target.value);
        }else if(e.target.name === 'pass'){
            setPass(e.target.value)
        }
    }

    return(
        <form action="#" className={style.form} onSubmit={Session}>
            <input ref={User} onInput={userInput} type="text" placeholder='Usuario' name="user" />
            <input ref={Pass} onInput={userInput} type="password" placeholder='Contraseña' name="pass" />
            <input type="submit" value="Inicio" />
            <UserAlert data-active={validUser}>Usuario no valido</UserAlert>
        </form>
    )
}

function LogIn (){

    return(
        <main className={style.main}>
            <Form />
        </main>
    )
}

export default LogIn