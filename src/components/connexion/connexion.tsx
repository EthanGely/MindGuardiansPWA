import { useState } from 'react';
import SelectRole from './selectRole';
import ChoixLogSign from './choixLogSign';
import './log.scss';


function Connexion() {
    const [role, setRole] = useState('');

    return (
        <>
        {role === '' ? <SelectRole /> : <ChoixLogSign role={role} /> }
        </>
    );
};

export default Connexion;