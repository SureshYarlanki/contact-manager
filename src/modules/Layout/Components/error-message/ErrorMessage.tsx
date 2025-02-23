// import React from "react";
// import NavBar from "../../Pages/Navbar/NavBar";
// import { Link } from "react-router-dom";


// const ErrorMessage:React.FC = () => {
//     return (
//         <>
//            <NavBar color={"bg-dark"} />
//         <div className=" text-center" id="error-message">
//             <p className="h1 text-center text-danger p-3 ">404 Not Found</p>
//                 <img src={"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/06/how-to-fix-error-404-1.png"} alt="" className=" img-fluid " />
//                 <br />
//                 <Link to="/" className="btn btn-success m-3">Back to Home</Link>
                
//         </div>
  
//         </>
//     )   
// }
// export default ErrorMessage;
import React from "react";
import { Link } from "react-router-dom";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <>
            {/* <NavBar color={"bg-dark"} /> */}
            
        <div className=" text-center" id="error-message">
         <p className="h1 text-center text-danger ">404 Not Found : {message}</p>
             <img src={"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/06/how-to-fix-error-404-1.png"} alt="" className=" img-fluid " />
             <br />
             <Link to="/" className="btn btn-success m-3">Back to Home</Link>
              
      
 
     </div>

     </>
    
  );
};

export default ErrorMessage;
