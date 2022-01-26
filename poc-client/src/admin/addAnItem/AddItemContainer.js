import React, { useRef, useEffect, useState, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "react-hook-form";

import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

import "../../css/style.css";

const AddItemContainer = () => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const [file2, setFile2] = useState();
  const [previewUrl2, setPreviewUrl2] = useState();
  const [isValid2, setIsValid2] = useState(false);

  const [typeToggle, setTypeToggle] = useState(true);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (!file2) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl2(fileReader.result);
    };
    fileReader.readAsDataURL(file2);
  }, [file2]);

  const pickedHandler = (event) => {
    let pickedfile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedfile = event.target.files[0];
      setFile(pickedfile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickedHandler2 = (event) => {
    let pickedfile;
    let fileIsValid = isValid2;
    if (event.target.files || event.target.files.length === 1) {
      pickedfile = event.target.files[0];
      setFile2(pickedfile);
      setIsValid2(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    name: "",
    price: "",
    description: "",
    bulkName: "",
    bulkDescription: "",
    bulkPrice: "",
    image: null,
    bulkImage: null,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        price: "",
        description: "",
        bulkName: "",
        bulkDescription: "",
        bulkPrice: "",
      });
    }
    setPreviewUrl(null);
    setPreviewUrl2(null);
  }, [reset, isSubmitSuccessful]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [aNumber, setANumber] = useState();

  const submitConsumerItem = async (cData) => {
    console.log(cData);

    const instance = cData.priceD.concat(cData.priceC);

    try {
      //const fileContent = fs.readFileSync(data.image[0])
      const formData = new FormData();
      formData.append("bucketPhotoId", file);
      formData.append("name", cData.name);
      formData.append("description", cData.description);
      formData.append("price", Number(instance));

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/createConsumerItem`,
        "POST",
        // JSON.stringify({
        //     name: data.name,
        //     description: data.description,
        //     price: data.price,
        //     bucketPhotoId: data.image[0]

        // }),

        formData,

        {
          //"Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitBulkItem = async (data) => {
    console.log(data);

    const instance = data.bulkPrice.concat(data.priceC);

    try {
      //const fileContent = fs.readFileSync(data.image[0])

      const formData = new FormData();
      formData.append("bucketPhotoId", file2);
      formData.append("name", data.bulkName);
      formData.append("description", data.bulkDescription);
      formData.append("price", Number(instance));

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/createBulkItem`,
        "POST",
        // JSON.stringify({
        //     name: data.name,
        //     description: data.description,
        //     price: data.price,
        //     bucketPhotoId: data.image[0]

        // }),

        formData,

        {
          //"Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFunc = () => {
    if (typeToggle === true) {
      setTypeToggle(false);
      setPreviewUrl(null);
      setPreviewUrl2(null);
    } else {
      setTypeToggle(true);
      setPreviewUrl(null);
      setPreviewUrl2(null);
    }
  };

  return (
    <div className="addItem">
      <div className="addItem-block">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}

        {typeToggle && (
          <div className="addItem-box">
            <div className="textsize" onClick={toggleFunc}>
              🔁
            </div>
            <div className="addItem-title">
              <h2>consumer good</h2>
            </div>
            <form
              className="addItem-form"
              onSubmit={handleSubmit(submitConsumerItem)}
            >
              <div className="addItem-inputs">
                <label className="addItem-picInput-label" for="input">
                  add image
                </label>
                <input
                  id="input"
                  {...register("cImage")}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                  className="addItem-picInput"
                />
                {/* <button type="button" onClick={pickImageHandler}> pick image</button> */}
                <div></div>
                <br />
                <br />
                <label>product</label>
                <br />
                <input maxLength="40" {...register("name")} />
                <br />
                <label>description</label>
                <br />
                <textarea maxLength="250" {...register("description")} />
                <br />
                <label>price</label>
                <br />
                $<input {...register("priceD")} />
                <br />
                ¢
                <input
                  defaultValue="00"
                  {...register("priceC")}
                  maxLength="2"
                />
                <br />
                <button className="addItem-submitButton">submit</button>
              </div>
            </form>
            {previewUrl && (
              <img
                className="image-upload__preview"
                src={previewUrl}
                alt="preview"
              />
            )}
          </div>
        )}

        {!typeToggle && (
          <div className="addItem-box">
            <div className="textsize" onClick={toggleFunc}>
              🔁
            </div>
            <div className="addItem-title">
              <h2>bulk</h2>
            </div>
            <form
              className="addItem-form"
              onSubmit={handleSubmit(submitBulkItem)}
            >
              <div className="addItem-inputs">
                <label className="addItem-picInput-label" for="input2">
                  add image
                </label>
                <input
                  id="input2"
                  {...register("bulkImage")}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler2}
                  className="addItem-picInput"
                />
                {/* <button type="button" onClick={pickImageHandler}> pick image</button> */}
                <div></div>
                <br />
                <br />
                <label>product</label>
                <br />
                <input {...register("bulkName")} />
                <br />
                <label>description</label>
                <br />
                <textarea {...register("bulkDescription")} />
                <br />
                <label>price</label>
                <br />
                $<input {...register("bulkPrice")} />
                <br />
                ¢
                <input
                  defaultValue="00"
                  {...register("priceC")}
                  maxLength="2"
                />
                <br />
                <button className="addItem-submitButton">submit</button>
              </div>
            </form>
            {previewUrl2 && (
              <img
                className="image-upload__preview"
                src={previewUrl2}
                alt="preview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemContainer;
