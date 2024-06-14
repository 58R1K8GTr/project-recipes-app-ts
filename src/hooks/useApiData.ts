import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UrlsType } from '../types';

export default function useApiData() {
  const [textInput, setTextInput] = useState('');
  const [radioInput, setRadioInput] = useState('ingredient');
  const location = useLocation();

  const apiName = location.pathname === '/meals'
    ? 'themealdb'
    : 'thecocktaildb';

  // objeto javascript contendo as urls brutas para acessar.
  const urls: UrlsType = {
    ingredient: `https://www.${apiName}.com/api/json/v1/1/filter.php?i=`,
    name: `https://www.${apiName}.com/api/json/v1/1/search.php?s=`,
    firstletter: `https://www.${apiName}.com/api/json/v1/1/search.php?f=`,
  };

  // função que retorna a url pronta para o uso.
  const generateUrl = () => {
    const url = `${urls[radioInput as keyof UrlsType]}${textInput}`;
    return url;
  };

  return {
    generateUrl,
    textInput,
    setTextInput,
    radioInput,
    setRadioInput,
  };
}
