import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdInsertDriveFile } from 'react-icons/md';
import Dropzone from 'react-dropzone';

import { BoxContainer, Header, FileInfo, Upload } from './styled.js';
import logo from '../../assets/logo.svg';

import socket from 'socket.io-client';
import api from '../services/api';

import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'

const Box = () => {

  const { id } = useParams();
  const [box, setBox] = useState({});
  
  useEffect(() => { 
    api.get(`boxes/${id}`).then(response => setBox(response.data));
  }, [])

  useEffect(() => {
    subscribeEventNewFiles();
  }, [])

  const subscribeEventNewFiles = () => {

    const io = socket('http://localhost:3333');

    io.emit('connectRoom', id);

    io.on('file', data => {
      setBox(box => ({
        ...box, files: [data, ...box.files]
      }));
    });

  }

  const handleUpload = (files) => {

    files.forEach(file => {
      const data = new FormData();
      data.append('file', file);
      api.post(`boxes/${id}/files`, data);
    });

  }

  return (
    <BoxContainer>
      <Header>
        <img src={logo} alt="Rocketbox"/>
        <h1>{box.title}</h1>
      </Header>

      <Dropzone onDropAccepted={handleUpload}>
        {({getRootProps, getInputProps}) => (

          <Upload {...getRootProps()}>
            <input {...getInputProps()}/>
            <p>Arraste arquivos ou clique aqui</p>
          </Upload>

        )}
      </Dropzone>

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