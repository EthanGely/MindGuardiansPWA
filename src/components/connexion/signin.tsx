import { useState, FormEvent, useEffect } from 'react';
import SelectRole from './selectRole';
import Forms, { FormsProps } from '../utils/forms';

const Signin = () => {

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userNaissance, setUserNaissance] = useState('');
    const [userFontSize, setUserFontSize] = useState('');
    const [usermail, setUserMail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [profession, setProfession] = useState('');
    const [link, setLink] = useState('');
    const [role, setRole] = useState(-1);
    const [roles, setRoles] = useState<{ ROLE_ID: number, ROLE_NAME: string, ROLE_LIBELLE: string }[]>([]);
    const [formData, setFormData] = useState<FormsProps>({ fieldSets: [] });

    const handleUserFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(event.target.value);
    };

    const handleUserLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLastName(event.target.value);
    };

    const handleUserNaissanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value.length, userNaissance.length);
        if (event.target.value.length > userNaissance.length) {
            if (event.target.value.length === 2 && !event.target.value.includes('/')) {
                event.target.value += '/';
            }

            if (event.target.value.length === 5 && !event.target.value.includes('/\d{2}//')) {
                event.target.value += '/';
            }
        }

        event.target.value = event.target.value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
        setUserNaissance(event.target.value);
        //setUserNaissance(event.target.value);
    };

    const handleUserFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserFontSize(event.target.value);
    };

    const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfession(event.target.value);
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const handleUserMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserMail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validateField(event.target, checkPasswordRequirements(event.target.value));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
        validateField(event.target, checkPassword(event.target.value));
    };

    const handleRoleChange = (roleId: number) => {
        setRole(roleId);
    };

    const handleSignIn = async (event: FormEvent) => {
        event.preventDefault();

        const responsePromise = fetch('https://ethan-server.com:8443/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userFirstName, userLastName, usermail, password, userRoleId: role })
        });

        responsePromise.then((response: Response) => {
            if (response.status === 200) {
                response.json().then((data: { jwt: string, location: string }) => {
                    localStorage.setItem('jwtToken', data.jwt);
                    window.location.href = data.location;
                });
            } else {
                alert("Invalid credentials");
            }
            (error: any) => {
                console.error("Error:", error);
            }
        });
    };

    function checkPassword(passConfirm: string) {
        console.log(password, passConfirm);
        return password === passConfirm;
    }

    function checkPasswordRequirements(pass: string) {
        const regexpCheck = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return regexpCheck.test(pass);
    }

    function validateField(target: HTMLElement, isValid: boolean) {
        if (isValid) {
            target.classList.add('valid');
            target.classList.remove('error');
        } else {
            target.classList.add('error');
            target.classList.remove('valid');
        }
    }

    useEffect(() => {
        const responsePromise = fetch('https://ethan-server.com:8443/role/getAll');

        responsePromise.then((response: Response) => {
            response.json().then((data: { ROLE_ID: number, ROLE_NAME: string, ROLE_LIBELLE: string }[]) => {
                setRoles(data.map((role) => role));
            });
        });
    }, []);

    useEffect(() => {
        switch (role) {
            case 1:
                //Patient
                setFormData({
                    fieldSets: [
                        {
                            fields: [
                                {
                                    name: 'userFirstName',
                                    libelle: 'Prénom',
                                    type: 'text',
                                    placeholder: 'Entrez votre rénom',
                                    handlerFunction: handleUserFirstNameChange,
                                },
                                {
                                    name: 'userLastName',
                                    libelle: 'Nom',
                                    type: 'text',
                                    placeholder: 'Entrez votre nom',
                                    handlerFunction: handleUserLastNameChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'userAge',
                                    libelle: 'Date de naissance',
                                    type: 'text',
                                    placeholder: 'JJ/MM/AAAA',
                                    handlerFunction: handleUserNaissanceChange,
                                    maxLength: 10
                                },
                                {
                                    name: 'fontSize',
                                    libelle: 'Taille du texte',
                                    type: 'text',
                                    placeholder: 'Taille du texte (TODO: dev les select)',
                                    handlerFunction: handleUserFontSizeChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'userMail',
                                    libelle: 'Adresse mail',
                                    type: 'mail',
                                    placeholder: 'Adresse mail',
                                    handlerFunction: handleUserMailChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'password',
                                    libelle: 'Mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handlePasswordChange,
                                },
                                {
                                    name: 'passwordConfirm',
                                    libelle: 'Confirmation du mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handleConfirmPasswordChange,
                                }
                            ]
                        }
                    ]
                });
                break;
            case 2:
                //Personnel médical
                setFormData({
                    fieldSets: [
                        {
                            fields: [
                                {
                                    name: 'userFirstName',
                                    libelle: 'Prénom',
                                    type: 'text',
                                    placeholder: 'Entrez votre rénom',
                                    handlerFunction: handleUserFirstNameChange,
                                },
                                {
                                    name: 'userLastName',
                                    libelle: 'Nom',
                                    type: 'text',
                                    placeholder: 'Entrez votre nom',
                                    handlerFunction: handleUserLastNameChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'profession',
                                    libelle: 'Profession',
                                    type: 'text',
                                    placeholder: 'Profession',
                                    handlerFunction: handleProfessionChange,
                                },
                                {
                                    name: 'userMail',
                                    libelle: 'Adresse mail',
                                    type: 'mail',
                                    placeholder: 'Adresse mail',
                                    handlerFunction: handleUserMailChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'password',
                                    libelle: 'Mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handlePasswordChange,
                                },
                                {
                                    name: 'passwordConfirm',
                                    libelle: 'Confirmation du mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handleConfirmPasswordChange,
                                }
                            ]
                        }
                    ]
                });
                break;
            case 3:
                // Famille
                setFormData({
                    fieldSets: [
                        {
                            fields: [
                                {
                                    name: 'userFirstName',
                                    libelle: 'Prénom',
                                    type: 'text',
                                    placeholder: 'Entrez votre rénom',
                                    handlerFunction: handleUserFirstNameChange,
                                },
                                {
                                    name: 'userLastName',
                                    libelle: 'Nom',
                                    type: 'text',
                                    placeholder: 'Entrez votre nom',
                                    handlerFunction: handleUserLastNameChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'userLink',
                                    libelle: 'Lien avec le patient',
                                    type: 'text',
                                    placeholder: 'Lien avec le patient',
                                    handlerFunction: handleLinkChange
                                },
                                {
                                    name: 'userMail',
                                    libelle: 'Adresse mail',
                                    type: 'mail',
                                    placeholder: 'Adresse mail',
                                    handlerFunction: handleUserMailChange,
                                }
                            ],
                        },
                        {
                            fields: [
                                {
                                    name: 'password',
                                    libelle: 'Mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handlePasswordChange,
                                },
                                {
                                    name: 'passwordConfirm',
                                    libelle: 'Confirmation du mot de passe',
                                    type: 'password',
                                    placeholder: 'Mot de passe',
                                    handlerFunction: handleConfirmPasswordChange,
                                }
                            ]
                        }
                    ]
                });
                break;
        }
    }, [role, userNaissance, password, passwordConfirm, profession, usermail, userFirstName, userLastName, userFontSize]);

    return (
        <>
            <SelectRole roles={roles} setRole={setRole} selectedRole={role} />
            {role !== -1 && roles.some(r => r.ROLE_ID === role) && formData.fieldSets.length !== 0 ?
                <>
                    <h2>{roles.find(r => r.ROLE_ID === role)?.ROLE_LIBELLE}</h2>
                    <Forms fieldSets={formData.fieldSets} />
                </> : ''}
        </>
    );
};

export default Signin;