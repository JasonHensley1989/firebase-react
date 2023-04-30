import { useState, useEffect } from 'react';

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=dMZVODzM_hfuHYBEn_CBTTD4VnV6Qd5U5dM_DE-eklE');
        const data = await response.json();
        console.log(data);
        setImageUrl(data.urls.regular);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}

export default RandomImage;