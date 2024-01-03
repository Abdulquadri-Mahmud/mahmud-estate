import Header2 from "../components/Header2";

export default function Estatelisting() {
  return (
    <>
      <Header2/>
      <main className="text-gray-100 bg-slate-700 mt-10 p-3 max-w-4xl mx-auto rounded-lg">
            <h1 className="text-center font-semibold text-2xl my-2">Create Listing</h1>
            <form className="flex flex-col mt-4 gap-5 md:flex-row ">
                <div className="flex flex-col gap-5 flex-1">
                    <input type="text" placeholder="Name" maxLength='62' minLength='10' className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                    <input type="text" placeholder="Description" className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                    <input type="text" placeholder="Address" className="p-3 bg-gray-200 rounded-lg border text-gray-800 font-semibold" required/>
                    <div className="flex gap-7 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5"/>
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5"/>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5"/>
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5"/>
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5"/>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-3 flex-col">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <input type="number" min='1' max='10' id="bedrooms" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                <span>Bedrooms</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" min='1' max='10' id="bathrooms" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                <span>Bathrooms</span>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-4">
                                <input type="number" id="regularPride" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                <div className="text-center">
                                    <p>Regular Price</p>
                                    <span className="text-sm">(#/month)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="discountPrice" className="w-20 p-1 rounded-lg border border-gray-300 text-gray-800" required/>
                                <div className="text-center">
                                    <p>Discounted Price</p>
                                    <span className="text-sm">(#/month)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <p><strong>Image: </strong><span className="font-normal">The first image will be the cover (max 6)</span></p>
                    <div className="my-4 flex gap-2">
                        <input className="w-full border border-gray-500 rounded-lg" type="file" id="file"  accept="image/*" multiple/>
                        <button className="uppercase bg-gray-700 text-gray-100 p-2 rounded-lg font-semibold w-full md:w-24 disbaled:opacity-80" type="button">Upload</button>
                    </div>
                    <button className="uppercase bg-gray-700 text-gray-100 hover:text-gray-800 w-full p-3 rounded-lg font-semibold hover:bg-gray-300 duration-300">Creat Listing</button>
                </div>
            </form>
        </main>
    </>
  )
}
