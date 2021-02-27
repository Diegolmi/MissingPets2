import React, {useState, useEffect} from 'react';


const useValidacion = ( stateInicial, validar, fn) => {

    const [valores, setValores] = useState(stateInicial);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noError = Object.keys(error).length === 0;

            if(noError) {
                fn(); //fn = funcion que se ejecuta en el componente
            }
            setSubmitForm(false);

        }
    }, [error]);

    //funcion que se ejecuta cuando el usuario escribe algo

    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Se ejecuta cuando hace submit

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setError(erroresValidacion);
        setSubmitForm(true);

    }

    const handleBlur = e => {
        const erroresValidacion = validar(valores);
        setError(erroresValidacion);
    }

    return {
        valores,
        error,
        handleChange,
        handleSubmit,
        handleBlur
    }
}

export default useValidacion
