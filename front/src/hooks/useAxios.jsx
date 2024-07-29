import { useState, useCallback } from 'react';
import axios from 'axios';

export const useAxios = (
  initialUrl = '',
  initialMethod = 'GET',
  initialParams = {},
  initialHeaders = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedPercent, setUploadedPercent] = useState(0);
  const [uploadedSize, setUploadedSize] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(0);

  const fetchData = useCallback(
    async ({
      url = initialUrl,
      method = initialMethod,
      params = initialParams,
      headers = initialHeaders,
      token,
      onUploadProgress
    }) => {
      setLoading(true);
      setError(null);

      // Detectar si los datos son FormData o JSON y ajustar los encabezados en consecuencia
      let fetchHeaders = { ...headers };
      let data;

      if (params instanceof FormData) {
        data = params;
        fetchHeaders['Content-Type'] = 'multipart/form-data';
      } else {
        data = JSON.stringify(params);
        fetchHeaders['Content-Type'] = 'application/json';
      }

      if (token) {
        fetchHeaders['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await axios({
          method: method.toUpperCase(),
          url,
          data,
          headers: fetchHeaders,
          onUploadProgress: progressEvent => {
            if (params instanceof FormData) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadedPercent(percent);
              setUploadedSize(progressEvent.loaded);

              if (onUploadProgress) {
                onUploadProgress(percent, progressEvent.loaded, progressEvent.total);
              }
            }
          }
        });

        setData(response.data);
        setLoading(false);
        setUploadedFiles(totalFiles);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    },
    [initialUrl, initialMethod, initialParams, initialHeaders, totalFiles]
  );

  return {
    fetchData,
    data,
    loading,
    error,
    uploadedPercent,
    uploadedSize,
    totalFiles,
    uploadedFiles
  };
};
