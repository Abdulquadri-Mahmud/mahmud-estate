import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

export default function Estatelisting() {
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFile] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploadImage, setUploadImage] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({imageUrls : [],
        name : '',
        description : '',
        address : '',
        type : '',
        regularPrice : 150000,
        discountPrice : 0,
        bathRooms : 1,
        bedRooms : 1,
        furnished : false,
        parking : false,
        offer : false,
    });

    console.log(formData);

    const handleUpload = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploadImage(true)
            const promises = [];

            for(let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            // this is going to wait for seletced images to load fininshed brfore pushing iside the empty arrya
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls: formData.imageUrls.concat(urls)
                });
                setImageUploadError(false);
            setUploadImage(false)
            }).catch(() => {
                setImageUploadError('Image upload failed (2mb max per image)')
            });
        }else{
            setImageUploadError('You can upload 6 images per listing!');
            setUploadImage(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {

            const storage = getStorage(app);

            const fileName = new Date().getTime() + file.name;

            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },(error) => {
                reject(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                })
            })
        });
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (formData.imageUrls.length < 1) {
                return setError('You have to upload at least one image');
            }
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError('Discount price must be lower than Regular price')
            }

            setLoading(true);
            setError(false);

            const response = await fetch('/api/listing/create', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    ...formData,
                    userRef : currentUser._id,
                })
            });

            const data = await response.json();
            if (data.success === false) {
                setError(data.message);
            }
            setLoading(false);
            console.log(data);
            // navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData, 
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text') {
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }
    }

  return (
    <div className="dark:bg-slate-800 mx-2 md:mx-0">
        <div className="flex justify-between ">
            <Sidebar/>
            <div className={`h-screen font-semibold flex-1`}>
                <Header/>
                <main className="text-gray-100 mx-2 bg-slate-800 dark:bg-slate-700 dark:shadow-2xl my-8 p-3 max-w-4xl mx-auto rounded-lg">
                    <h1 className="text-center font-semibold text-2xl my-2">Create Listing</h1>
                    <form className="flex flex-col mt-4 gap-5 md:flex-row " onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5 flex-1">
                            <input type="text" placeholder="Name" id="name" maxLength='62' minLength='10' onChange={handleChange} className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                            <input type="text" placeholder="Description" id="description" onChange={handleChange} className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                            <input type="text" placeholder="Address" id="address" onChange={handleChange} className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                            <div className="flex gap-7 flex-wrap">
                                <div className="flex gap-2">
                                    <input type="checkbox" id="sale" className="w-5" checked={formData.type === 'sale'}  onChange={handleChange}/>
                                    <span>Sell</span>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" id="rent" className="w-5" checked={formData.type === 'rent'} onChange={handleChange}/>
                                    <span>Rent</span>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" id="parking" className="w-5" checked={formData.parking} onChange={handleChange}/>
                                    <span>Parking Spot</span>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" id="furnished" className="w-5" checked={formData.furnished} onChange={handleChange}/>
                                    <span>Furnished</span>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" id="offer" className="w-5" checked={formData.offer} onChange={handleChange}/>
                                    <span>Offer</span>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-col">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <input type="number" min='1' max='10' onChange={handleChange} value={formData.bedRooms} id="bedRooms" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                        <span>Bedrooms</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="number" min='1' max='10' onChange={handleChange} value={formData.bathRooms} id="bathRooms" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                        <span>Bathrooms</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex items-center gap-4">
                                        <input type="number" min='100000' max='100000000' id="regularPrice" onChange={handleChange} value={formData.regularPrice} className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                        <div className="text-center">
                                            <p>Regular Price</p>
                                            <span className="text-sm">(#/month)</span>
                                        </div>
                                    </div>
                                    {
                                        formData.offer && (
                                            <div className="flex items-center gap-4">
                                                <input type="number" min='0' max='100000000' id="discountPrice" onChange={handleChange} value={formData.discountPrice} className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                                <div className="text-center">
                                                    <p>Discounted Price</p>
                                                    <span className="text-sm">(#/month)</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 border-0 md:border-l-2 pl-4 border-gray-500">
                            <p><strong>Image: </strong><span className="font-normal">The first image will be the cover (max 6)</span></p>
                            <div className="my-4 flex gap-2">
                                <input onChange={(e) => setFile(e.target.files)} className="cursor-pointer w-full border border-gray-500 rounded-lg" type="file" id="file"  accept="image/*" multiple/>
                                <button onClick={handleUpload} className="uppercase bg-gray-300 text-center text-gray-800 py-2 rounded-lg font-semibold w-full md:w-24" type="button">
                                    {
                                        uploadImage ? 'Uploading' : 'Upload'
                                    }
                                </button>
                            </div>
                            <p className="my-2 text-red-500">{imageUploadError && imageUploadError}</p>
                            <>
                                {
                                    formData.imageUrls.map((url, index) => (
                                        <div className="flex justify-between items-center gap-2 my-2 pb-3 border-b-2 border-slate-400" key={url}>
                                            <img src={url} alt="listing image" className="w-22 h-20 rounded object-cover " />
                                            <button className="text-red-500 hover:text-red-700 duration-200" type="button" onClick={() =>  handleRemoveImage(index)}>Delete</button>
                                        </div>
                                    ))
                                }
                            </>
                            <button disabled={loading || uploadImage} className="uppercase bg-gray-300 text-gray-800 hover:text-gray-800 w-full p-3 rounded-lg font-semibold hover:bg-gray-400 duration-200">
                                {
                                    loading ? 'Creating...' : 'create listing'
                                }
                            </button>
                            {error && <p className="text-red-500 pt-3">{error}</p>}
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>
  )
}
