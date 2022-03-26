
import { CameraIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "../firebase"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function AddProduct() {
  
  const {user} = useContext(AuthContext)
  const request = axios.create({
    baseURL: "https://iperfume.herokuapp.com/api",
    headers: { token: `Bearer ${user?.token}`}
  });

  const [loading, setLoading] = useState(false)
  const chooseImg = useRef()
  const [file, setFile] = useState(null)
  const [counter, setCounter] = useState(1)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // Select all inputs
  const name = useRef()
  const brand = useRef()
  const desc = useRef()
  const price = useRef()
  const quantity = useRef()
  const category = useRef()

  const handleImage = e => {
        // If no image selected, return
        if (!/^image\//.test(e.target.files[0].type)) {
            console.log(`File ${e.target.files[0].name} is not an image.`);
            return false;
        }
        setFile(e.target.files[0])
  }

  const postProduct = async e => {
    e.preventDefault()
    if (!file) return;

    setLoading(true);

    const timeout = () => {
      setTimeout(() => {
        setLoading(false);
        setSuccess(false)
        setError(false)
      }, 4000);
    } 

    const newProduct = {
      name: name.current.value,
      price: price.current.value,
      category: category.current.value,
      quantity: quantity.current.value,
      desc: desc.current.value,
      brand: brand.current.value,
    };

    const firebaseImageRef = ref(storage, `${file.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    // Upload the file and metadata
    try {
      // const uploadTask = uploadBytes(storageRef, file, metadata)
      await uploadBytes(firebaseImageRef, file, metadata).then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(firebaseImageRef);
          newProduct.picture = downloadURL;
        }
      );
    } catch (err) {
      console.log(err);
    }

    try {
     const res = await request.post(`/product/create/${user.id}`, newProduct)
     setLoading(false);
      name.current.value = ""
      price.current.value = ""
      category.current.value = "Unisex"
      setCounter(1)
      desc.current.value = ""
      brand.current.value = ""
      setFile(null)
      setError(false)
      setSuccess(true)
      timeout()
    } catch (error) {
      setLoading(false);
      setSuccess(false)
      setError(true)
      timeout()
    }
  }


  return (
    <div className="w-full mx-auto p-4 border rounded-md border-gray-200 shadow-md">
      {success && (
        <h1 className="bg-green-500 opacity-80 p-2 text-white rounded-sm m-4 font-bold text-center">
          Product was succesffuly published
        </h1>
      )}
      {error && (
        <h1 className="bg-red-500 p-2 text-white rounded-sm m-4 font-bold text-center">
          An error occured
        </h1>
      )}
      <div className="flex flex-col gap-5 md:grid grid-cols-5 space-x-5">
        {file ? (
          <div className="relative bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center">
            <img
              src={URL.createObjectURL(file)}
              className="rounded-sm object-contain h-full w-full"
              alt=""
            />
            <span
              onClick={() => chooseImg.current.click()}
              className="absolute -top-2 text-md right-0 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
            >
              <CameraIcon className="h-7 text-orange-600" />
            </span>
            <input
              type="file"
              accept="image/"
              hidden
              ref={chooseImg}
              onChange={handleImage}
            />
          </div>
        ) : (
          <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center">
            <CameraIcon
              onClick={() => chooseImg.current.click()}
              className="h-24 text-gray-300 cursor-pointer"
            />
            <p
              onClick={() => chooseImg.current.click()}
              className="text-xs font-bold text-gray-400 cursor-pointer"
            >
              Click to Add Photo of Product
            </p>
            <input
              type="file"
              accept="image/"
              hidden
              ref={chooseImg}
              onChange={handleImage}
            />
          </div>
        )}
        <form onSubmit={postProduct} className="col-span-3 space-y-5 py-5">
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Name
            </p>
            <input
              required
              ref={name}
              type="text"
              placeholder="Chanel Coco Mademoiselle"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Description
            </p>
            <input
              required
              ref={desc}
              type="text"
              placeholder="Add a short description about the perfume"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Price (NGN)
            </p>
            <input
              required
              ref={price}
              type="number"
              placeholder="1200"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Brand
            </p>
            <input
              required
              ref={brand}
              type="text"
              placeholder="Dolce and Gbanana"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Quantity
            </p>
            <div className="border-b rounded-sm border-gray-300 flex items-center justify-between px-7">
              <button
                disabled={counter < 2}
                onClick={e => {e.preventDefault(); setCounter(counter - 1)}}
                className="text-xl text-gray-700 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              >
                -
              </button>
              <input
                required
                ref={quantity}
                id="quantity"
                type="number"
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
              />
              <p
                onClick={() => setCounter(counter + 1)}
                className="text-xl text-gray-700 font-bold cursor-pointer"
              >
                +
              </p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Category
            </p>
            <select
              onClick={(e) => e.preventDefault()}
              ref={category}
              className="border-b p-1 border-gray-400 outline-none rounded-md text-sm w-full"
            >
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white font-bold tracking-wider p-2 bg-orange-600 rounded-md block w-full mx-auto max-w-[500px]"
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
}
