import { CameraIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { useRecoilState } from "recoil";
import { productItem } from "../modalAtom";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import storage from "../firebase"
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AddProduct({query}) {

  const {user} = useContext(AuthContext)
  const request = axios.create({
    baseURL: "https://iperfume.herokuapp.com/api",
    headers: { token: `Bearer ${user?.token}`}
  });
  
  const [product, SetProduct] = useRecoilState(productItem)
  const [counter, setCounter] = useState(product.quantity)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

    // Select all inputs
    const name = useRef()
    const brand = useRef()
    const desc = useRef()
    const price = useRef()
    const quantity = useRef()
    const category = useRef();
    const chooseImg = useRef();
   
    const handleImage = (e) => {
      // If no image selected, return
      if (!/^image\//.test(e.target.files[0].type)) {
        console.log(`File ${e.target.files[0].name} is not an image.`);
        return false;
      }
      setFile(e.target.files[0]);
    };

    const updatePerfume = async (e) => {
      e.preventDefault();
      setLoading(true);

      const newProduct = {};
      name.current.value && (newProduct.name = name.current.value)
      category.current.value && (newProduct.category = category.current.value)
      price.current.value && (newProduct.price = price.current.value)
      quantity.current.value && (newProduct.quantity = quantity.current.value)
      desc.current.value && (newProduct.desc = desc.current.value)
      brand.current.value && (newProduct.brand = brand.current.value)

      if (file) {
        // delete previous file
        const deleteRef = ref(storage, `${product.picture}`);
        // Delete the file
        deleteObject(deleteRef)
          .then(() => {
            // File deleted successfully
            console.log("old picture deleted");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
            return;
          });

        // upload new picture
        const firebaseImageRef = ref(storage, `${file.name}`);
        const metadata = {
          contentType: "image/jpeg",
        };

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
          return;
        }
      }

      const timeout = () => {
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setError(false);
        }, 4000);
      };

      try {
        const res = await request.put(`/${query}/update/${user.id}?id=${product._id}`, newProduct)
        SetProduct(res.data)
        setLoading(false);
         name.current.value = ""
         price.current.value = ""
         category.current.value = ""
         setCounter(res.data.quantity)
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

    };

  return (
    <div className="w-[99%] md:w-[95%] mx-auto p-4 border rounded-md border-gray-200 max-w-[950px] shadow-md">
      {success && (
        <h1 className="bg-green-500 opacity-80 p-2 text-white rounded-sm m-4 font-bold text-center">
          Product was succesffuly Updated
        </h1>
      )}
      {error && (
        <h1 className="bg-red-500 p-2 text-white rounded-sm m-4 font-bold text-center">
          An error occured
        </h1>
      )}
      <div className="flex flex-col gap-5 md:grid grid-cols-5 space-x-5">
        <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center relative">
          <button
            onClick={() => (file ? setFile(null) : chooseImg.current.click())}
            className="absolute top-5 border-b text-blue-500 font-semibold text-sm border-blue-500 z-10"
          >
            {file ? "Remove Picture" : "Change Picture"}
          </button>
          <input
            type="file"
            accept="image/"
            hidden
            ref={chooseImg}
            onChange={handleImage}
          />
          <img
            src={file ? URL.createObjectURL(file) : product.picture}
            alt=""
            className="w-full h-full absolute object-contain"
          />
        </div>
        <form onSubmit={updatePerfume} className="col-span-3 space-y-5 py-5">
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Name
            </p>
            <input
              type="text"
              ref={name}
              defaultValue={product.name}
              placeholder="perfume name"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Description
            </p>
            <input
              type="text"
              ref={desc}
              defaultValue={product.desc}
              placeholder="Add a short description about the perfume"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Price (NGN)
            </p>
            <input
              type="number"
              ref={price}
              defaultValue={product?.price}
              placeholder="1200"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Brand
            </p>
            <input
              type="text"
              ref={brand}
              defaultValue={product.brand}
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
                disabled={counter == 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCounter(counter - 1);
                }}
                className="text-xl text-gray-700 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                ref={quantity}
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCounter(counter + 1);
                }}
                className="text-xl text-gray-700 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Category
            </p>
            <select
              ref={category}
              onChange={(e) => e.preventDefault()}
              className="border-b p-1 border-gray-400 outline-none rounded-md text-sm w-full"
            >
              <option value="unisex">{product.category}</option>
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white font-bold tracking-wider p-2 bg-orange-600 rounded-md block w-full mx-auto max-w-[500px]"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
