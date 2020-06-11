import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg'
import { MainContainer, Form } from './styled';

import api from '../services/api';

const Main = () => {

  const history = useHistory();
  const [boxName, setBoxName] = useState('');

  const handleSubmit = async e => {
    
    e.preventDefault();
    const { data } = await api.post('boxes', { title: boxName });

    history.push(`/box/${data._id}`);

  }

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit}>
        <img src={logo} alt="Rocketbox"/>
        <input 
          type="text"
          placeholder="Criar um box"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
        />
        <button type="submit">Criar</button>  
      </Form>
    </MainContainer>
  );
}

export default Main;