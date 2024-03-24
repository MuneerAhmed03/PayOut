import { useNavigate } from "react-router-dom";

export const Appbar = ({name}) => {
    const navigate=useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 text-lg uppercase font-bold hover:italic text-purple text-sky-900">
            Payout 🚀
        </div>
        <div className="flex items-center">
            <div className="rounded-full h-11 w-11 bg-sky-200 flex justify-center mt-1 mr-2 my-1">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0]}
                </div>
            </div>
        <div className="flex items-center justify-center h-full mr-4">
            <button className="px-4 py-2  text-sm text-white bg-sky-900 rounded hover:bg-red-600"
                onClick={()=>
                    {localStorage.removeItem("token")
                    navigate("/signin");
                }}>
                Sign Out
            </button>
        </div>
        </div>
    </div> 
}