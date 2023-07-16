import React, { useEffect, useState } from 'react';

const PreloadImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setIsLoading(false);
    };

    return () => {
      image.onload = null;
    };
  }, [src]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <img src={src} alt={alt} />
      )}
    </>
  );
};

export default PreloadImage;