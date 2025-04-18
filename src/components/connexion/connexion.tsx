import { useState } from 'react';
//import SelectRole from './selectRole';
import ChoixLogSign from './choixLogSign';


function Connexion() {
    const [role] = useState('');

    return (
        <>
        {role === '' ? '' : <ChoixLogSign/> }
        </>
    );
}

export default Connexion;