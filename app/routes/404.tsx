import { useLocation } from "react-router"

export default function FourOhFour() {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="max-w-7xl mx-auto p-3">
            <h2>
                404! Not Found!
            </h2>
        </div>
    )
}