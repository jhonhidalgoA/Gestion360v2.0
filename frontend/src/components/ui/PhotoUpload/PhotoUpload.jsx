import { useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import "./PhotoUpload.css";

const PhotoUpload = ({ name = "photo", register }) => {
  const [preview, setPreview] = useState(null);
  const { onChange, ...inputProps } = register(name);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    onChange(e);
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="photo-upload">
      <label className="photo-upload__box">
        {preview ? (
          <img src={preview} alt="Foto" className="photo-upload__img" />
        ) : (
          <>
            <TbPhoto className="photo-upload__icon" />
            <span className="photo-upload__text">Click para subir foto</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="photo-upload__input"
          onChange={handleChange}
          {...inputProps}
        />
      </label>
    </div>
  );
};

export default PhotoUpload;