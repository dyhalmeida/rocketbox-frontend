import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoxContainer, Header, FileInfo } from './styled.js';
import logo from '../../assets/logo.svg';
import { MdInsertDriveFile } from 'react-icons/md';

import api from '../services/api';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'

function Box() {

  const { id } = useParams();
  const [box, setBox] = useState({});
  
  useEffect(() => { 

    api.get(`boxes/${id}`)
    .then(response => setBox(response.data));

  }, [id])



  return (
    <BoxContainer>
      <Header>
        <img src={logo} alt="Rocketbox"/>
        <h1>{box.title}</h1>
      </Header>

      <ul>
        { box.files && box.files.map(file => (
          <li key={file._id}>
            <FileInfo href={file.url} target="_blank">
              <MdInsertDriveFile size={24} color="a5cfff" />
              <strong>{file.title}</strong>
            </FileInfo>
            <span>há{" "}{formatDistance(parseISO(file.createdAt), new Date(), { locale: pt })}</span>
          </li>
        )) }
      </ul>

    </BoxContainer>
  );;
}

export default Box;