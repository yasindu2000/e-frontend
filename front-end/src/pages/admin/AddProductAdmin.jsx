import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/MediaUpload";


function AddProductAdmin() {

	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [alternativeNames, setAlternativeNames] = useState("");
	const [labelledPrice, setLabelledPrice] = useState("");
	const [price, setPrice] = useState("");
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	const [stock, setStock] = useState("");
	const [isAvailable, setIsAvailable] = useState(true);
	const [category, setCategory] = useState("cream");
    const navigate = useNavigate()

    async function handleSubmit(){

    const promisesArray = []

		for(let i=0; i<images.length; i++){

			const promise = uploadFile(images[i])
			promisesArray[i] = promise

		}

        const responses = await Promise.all(promisesArray)
		console.log(responses)	


        const altNamesInArray = alternativeNames.split(",")
        const productData = {
            productId: productId,
            name: productName,
            altNames: altNamesInArray,
            labelledPrice: labelledPrice,
            price: price,
            images: responses,
            description: description,
            stock: stock,
            isAvailble: isAvailable,
            category: category
        }

        const token = localStorage.getItem("token");

        if(token == null){
            navigate("/login");
            return;
        }

        axios.post("http://localhost:5000/products", productData, 
            {
                headers:{
                    Authorization: "Bearer "+token
                }
            }
        ).then(
            (res)=>{
                console.log("Product added successfully");
                console.log(res.data);
                toast.success("Product added successfully");
                navigate("/admin/products");
            }
        ).catch(
            (error)=>{
                console.error("Error adding product:", error);
                toast.error("Failed to add product");              
            }
        )

        console.log(productData);


    }
  return (
   <div className="w-full h-full flex justify-center items-center bg-gray-50 p-6">
  <div className="w-[600px] border-[3px] border-gray-300 rounded-[15px] p-[40px] flex flex-wrap justify-between bg-white shadow-lg">
    
    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Product ID</label>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[300px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Product Name</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[500px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Alternative Names</label>
      <input
        type="text"
        value={alternativeNames}
        onChange={(e) => setAlternativeNames(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Labelled Price</label>
      <input
        type="number"
        value={labelledPrice}
        onChange={(e) => setLabelledPrice(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[500px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Images</label>
      <input
        multiple
        type="file"
        onChange={(e) => setImages(e.target.files)}
        className="w-full border border-gray-300 h-[40px] rounded-md cursor-pointer px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[500px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 h-[100px] rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>

    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Stock</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Is Available</label>
      <select
        value={isAvailable}
        onChange={(e) => setIsAvailable(e.target.value === "true")}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value={true}>Available</option>
        <option value={false}>Not Available</option>
      </select>
    </div>

    <div className="w-[200px] flex flex-col gap-[5px]">
      <label className="text-sm font-semibold text-gray-700">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 h-[40px] rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="cream">Cream</option>
        <option value="face wash">Face Wash</option>
        <option value="soap">Soap</option>
        <option value="fragrance">Fragrance</option>
      </select>
    </div>

    <div className="w-full flex justify-center flex-row py-[20px] gap-4">
      <Link
        to={"/admin/products"}
        className="w-[200px] h-[50px] bg-white text-gray-700 border-[2px] border-gray-300 rounded-md flex justify-center items-center hover:bg-gray-100 transition"
      >
        Cancel
      </Link>
      <button
        onClick={handleSubmit}
        className="w-[200px] cursor-pointer h-[50px] bg-blue-600 text-white border-[2px] border-blue-600 rounded-md flex justify-center items-center hover:bg-blue-700 transition"
      >
        Add Product
      </button>
    </div>

  </div>
</div>

  )
}

export default AddProductAdmin