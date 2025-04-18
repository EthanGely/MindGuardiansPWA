import { ChangeEventHandler } from "react";
import "./forms.scss";

export type FormsProps = {
    fieldSets: {
        fields: {
            name: string,
            libelle: string,
            type: string,
            placeholder?: string,
            handlerFunction: ChangeEventHandler<HTMLInputElement>,
            maxLength?: number
        }[]
    }[]
};

const Forms: React.FC<{ formData: FormsProps, action: () => void }> = ({ formData, action }) => {
    return (
        <>
            <form className="formComponent">
                {formData.fieldSets.map((fieldSet: { fields: FormsProps['fieldSets'][0]['fields'] }, index: number) => (
                    <fieldset key={index} className="flex spaceEvenly gap">
                        {fieldSet.fields.map((field: { name: string, libelle: string, type: string, placeholder?: string, handlerFunction: ChangeEventHandler<HTMLInputElement>, maxLength?: number }, jndex: number) => (
                            <div key={jndex} className="formGroup flex col start">
                                <label>{field.libelle}</label>
                                {field.type === 'mail' || field.type === "text" || field.type === "password" || field.type === "tel" ?
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={field.handlerFunction}
                                        maxLength={field.maxLength}
                                    />
                                    : ''}

                            </div>
                        ))}
                    </fieldset>
                ))}
                <button onClick={() => { action() }} type="button">Soumettre</button>
            </form>
        </>
    );
};

export default Forms;