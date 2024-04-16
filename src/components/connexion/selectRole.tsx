const SelectRole = ({roles, setRole, selectedRole}: { roles: any, setRole: any, selectedRole: number }) => {

    function handleRoleChange(roleID: number) {
        setRole(roleID);
    }

    return (
        <>
            <h2>Qui êtes-vous ?</h2>
            <div className='list-3'>
                {roles.map((role: { ROLE_ID: number, ROLE_LIBELLE: string, ROLE_IMAGE: String }, index: number) => (
                        <div key={index} className={selectedRole === role.ROLE_ID ? 'item selected' : 'item'}>
                            <div className="visuel">
                                <img src={role.ROLE_LIBELLE.toString()} alt={role.ROLE_LIBELLE} />
                            </div>
                            <div className="itemInfo">
                                <h3><button onClick={() => {handleRoleChange(role.ROLE_ID)}}>{role.ROLE_LIBELLE}</button></h3>
                            </div>
                        </div>
                ))}
            </div>
        </>
    );
};

export default SelectRole;