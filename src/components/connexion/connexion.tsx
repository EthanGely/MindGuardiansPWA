import { useState } from 'react';
// @ts-ignore
import SelectRole from './selectRole';
import ChoixLogSign from './choixLogSign';


function Connexion() {
    // @ts-ignore
    const [role, setRole] = useState('');

    return (
        <>
        {role === '' ? '' : <ChoixLogSign/> }
        </>
    );
};

export default Connexion;