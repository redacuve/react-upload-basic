import React, { useState } from 'react';
import {
  Button,
  LinearProgress,
  Box,
  Typography,
  ListItem,
} from '@mui/material';

function Formulario() {
  const [urlImg, setURLImg] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [currentFile, setCurrentFile] = useState<any>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [fileInfos, setFileInfos] = useState<any[]>([]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    setSelectedFiles(event.target.files);
  };

  const upload = (event: React.MouseEvent<HTMLElement>) => {
    let currentF = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentF);
    console.log(currentF.name);
    console.log(currentF.size);
    // mandar el upload al back fetch
    /// api aqui
    const data = new FormData();
    data.append('idMedico', '10');
    data.append('idPaciente', '1');
    data.append('nombre',currentF.name);
    data.append('peso', currentF.size);
    data.append('registro', 'transfusiones');
    data.append('file', currentF);
    fetch('http://localhost:5000/upload/', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('el resultado es');
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        console.log('hubo un error');
      });
  };

  const obtainObject = () => {
    fetch('http://localhost:5000/upload/', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('el resultado es');
        console.log(result);
        setURLImg(result.url);
      })
      .catch((err) => {
        console.log(err);
        console.log('hubo un error');
      });
  };

  const deleteObject = () => {
    fetch('http://localhost:5000/upload/', {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('el resultado es');
        console.log(result);
        setURLImg(result.url);
      })
      .catch((err) => {
        console.log(err);
        console.log('hubo un error');
      });
  };

  return (
    <div>
      <h1>Formulario</h1>
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}

      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept=".csv, .odt, .ods, odp, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          onChange={selectFile}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Files
        </Button>
      </label>
      <div className="file-name">
        {selectedFiles && selectedFiles.length > 0
          ? selectedFiles[0].name
          : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!selectedFiles}
        onClick={upload}
      >
        Upload
      </Button>

      <Typography
        variant="subtitle2"
        className={`upload-message ${isError ? 'error' : ''}`}
      >
        {message}
      </Typography>

      <Typography variant="h6" className="list-header">
        List of Files
      </Typography>
      <Button
        variant="contained"
        onClick={() => obtainObject()}
      >
        Obtain File
      </Button>
      <Button
        variant="contained"
        onClick={() => deleteObject()}
      >
        Delete File
      </Button>
      {urlImg.length > 0 && (<div className="w-full"><div className="w-1/2"><img src={urlImg} alt="imagen del amazon" width="100%" height="100%" /></div></div>)}
      <ul className="list-group">
        {fileInfos &&
          fileInfos.map((file, index) => (
            <ListItem divider key={index}>
              <a href={file.url}>{file.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
}

export default Formulario;
