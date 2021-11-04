import React, { useState } from 'react';
import {
  Button,
  LinearProgress,
  Box,
  Typography,
  ListItem,
} from '@mui/material';

function Formulario() {
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [currentFile, setCurrentFile] = useState<any>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [fileInfos, setFileInfos] = useState<any[]>([]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setSelectedFiles(event.target.files);
  };

  const upload = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
    let currentF = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentF);
    // mandar el upload al back fetch
    /// api aqui
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
