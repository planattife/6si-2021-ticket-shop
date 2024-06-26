//styled components
import {
    StyledFormsArea,
    StyledTitle,
    ButtonGroup,
    StyledContainer,
} from "../../components/Styles";
import styled from 'styled-components'
import React, { useState } from "react";
import axios from "axios";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone, FiCamera } from 'react-icons/fi';
import {HiOutlineIdentification} from 'react-icons/hi'
import { format, parseISO } from 'date-fns';

import { useNavigate } from 'react-router-dom';

const ExitButtonContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
`
const ExitButton = styled.button`
    background-color:transparent;
    border: 1px solid red;
    border-radius: 25px;
    color: red;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;

    &:hover{
        background-color: red;
        color: #fff;
        cursor: pointer;
    }
`
const SaveButton = styled.button`
    padding: 10px;
    margin: 10px;
    width: 150px;
    height: 45px;
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
    border: 3px solid #00a000;
    border-radius: 25px;
    color: #00a000;
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: #00a000;
        color: #fff;
        cursor: pointer;
    }

`

const EditProfile = ({ userData, closeModal }) => {
    const initialState = {
        email: "",
        senha: "",
        repetirSenha: "",
        dataNascimento: "",
        nome: "",
        cpfCnpj: "",
        telefoneContato: "",
        role: "",
    };

    const [values, setValues] = useState(initialState);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const editApi = async (values, userData) => {
        let resultado = false;
        
        let { email, senha, repetirSenha, dataNascimento,
            nome, cpfCnpj, telefoneContato, role, fotoPerfil } = values;
        

        if (senha === repetirSenha) {
            await axios.put(`http://localhost:8080/api/v1/users/${userData.id}`, {
                role: userData.role,
                nome: nome !== '' ? nome : userData.nome,
                cpfCnpj: cpfCnpj !== '' ? cpfCnpj : userData.cpfCnpj,
                telefoneContato: telefoneContato !== '' ? telefoneContato : userData.telefoneContato,
                fotoPerfil: fotoPerfil !== '' ? fotoPerfil : userData.fotoPerfil,
                dataNascimento: userData.dataNascimento,
                email: email !== '' ? email : userData.email,
                senha: senha !== '' ? senha : userData.senha,
            }).then((res) => {
                resultado = true;
            }).catch((err) => {
                console.log(err);
                resultado = false;
            });
        }
        else {
            resultado = false;
        }
        return resultado;
    };

    function onChange(e){
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

     async function onSubmit(e){
        e.preventDefault();
        const resultadoRegistro = await editApi(values, userData);
        
        if(resultadoRegistro){
            navigate('/');
            navigate('/profile');
        }

        setError(true);
        setValues(initialState);
     }

    return (
        <StyledContainer>
            <StyledFormsArea>
                <ExitButtonContainer>
                    <ExitButton onClick={() => {closeModal(false)}}> X </ExitButton>
                </ExitButtonContainer>
                <StyledTitle
                    color="#000"
                    size={30}
                >
                    EDITAR PERFIL
                </StyledTitle>
                <Formik>
                    <Form onSubmit={ onSubmit }>
                        <TextInput
                            name="nome"
                            type="text"
                            label="Nome"
                            placeholder="Digite seu nome"
                            icon={<FiUser />}
                            onChange={ onChange }
                        />

                        <TextInput
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            icon={<FiMail />}
                            onChange={ onChange }
                        />

                        <TextInput
                            name="telefoneContato"
                            type="text"
                            label="Telefone"
                            placeholder="Digite seu telefone"
                            icon={<FiPhone />}
                            onChange={ onChange }
                        />

                        <TextInput
                            name="cpfCpnj"
                            type="text"
                            label="CPF ou CNPJ"
                            placeholder="Digite seu CPF/CNPJ"
                            icon={<HiOutlineIdentification />}
                            onChange={ onChange }
                        />
                        <TextInput
                            name="senha"
                            type="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon={<FiLock />}
                            onChange={ onChange }
                        />

                        <TextInput
                            name="repetirSenha"
                            type="password"
                            label="Confirmação senha"
                            placeholder="Confirme sua senha"
                            icon={<FiLock />}
                            onChange={ onChange }
                        />

                        <TextInput
                            name="fotoPerfil"
                            type="text"
                            label="Foto de Perfil"
                            placeholder="Insira a URL da foto"
                            icon={<FiCamera />}
                            onChange={ onChange }
                        />
                        <ButtonGroup>
                            <SaveButton type="submit">
                                Salvar
                            </SaveButton>
                        </ButtonGroup>
                    </Form>
                </Formik>
            </StyledFormsArea>
        </StyledContainer>
    );
}

export default EditProfile;