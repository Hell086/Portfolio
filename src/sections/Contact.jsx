import {useState} from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { motion } from "motion/react";

const Contact=()=>{
    const [formData, setFormData]= useState({
        name:"",
        email:"",
        services:"",
        message:"",
    });
    const [isLoading, setIsLoading]= useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };
     const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
    const handleSubmit =async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        // Handle form submission logic here
        //service_35tsg3u
        //template_g7kvzrn
        try {
            console.log("From submitted:", formData);
           await emailjs.send("service_35tsg3u","template_g7kvzrn", 
            {
            from_name: formData.name,
            to_name: "Binay",
            from_email: formData.email,
            to_email: "binayshrestha086@gmail.com",
            form_services: formData.services,
            to_services: "Web Development",
            message: formData.message,
        },
        "v5sMF1_wK-2Hx4_s5"
    );
      setIsLoading(false);
      setFormData({ name: "", email: "", services:"", message: "" });
      showAlertMessage("success", "You message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };
    return (
        <section className="relative flex items-center c-space section-spacing" id="contact">
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex flex-col items-center justify-center w-full">
                <h2 className="pb-8 text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 ">
                    Contact Me</h2>
                
                <div className="flex flex-col items-start w-full gap-5 mb-10flex flex-col items-center justify-center max-w-md 
                     p-5 mx-auto border-2 border-spanishgray rounded-2xl
                  bg-white">
                    
                    <h2 className="font-bold text-xl text-neutral-700">
                       Provide your details
                    </h2>
             
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="feild-label">
                            Full Name
                        </label>
                        <input 
                        id="name"
                        name="name"
                        type="text"
                        className="field-input feild-input-focus" 
                        placeholder="enter your full name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                    </div>
                     <div className="mb-5">
                        <label htmlFor="name" className="feild-label">
                        Email
                        </label>
                        <input 
                        id="email"
                        name="email"
                        type="email"
                        className="field-input feild-input-focus" 
                        placeholder="youremail@email.com"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </div>
                     <div className="mb-5">
                        <label htmlFor="name" className="feild-label">
                            Services
                        </label>
                        <input 
                        id="services"
                        name="services"
                        type="text"
                        className="field-input feild-input-focus" 
                        placeholder="Select the services you need"
                        autoComplete="services"
                        value={formData.services}
                        onChange={handleChange}
                        required/>
                    </div>
                     <div className="mb-5">
                        <label htmlFor="message" className="feild-label">
                            Message
                        </label>
                        <textarea
                        id="message"
                        name="message"
                        type="text"
                        rows="4"
                        className="field-input feild-input-focus" 
                        placeholder="What's on your mind?"
                        autoComplete="message"
                        value={formData.message}
                        onChange={handleChange}
                        required/>
                    </div>
                    {/* CHANGED: Updated button styling and animation to match "Let's chat" button */}
                    <motion.button 
                        type="submit"
                        className="w-full px-8 py-3 bg-transparent border-2 hover:cursor-pointer border-blue-600 rounded-full text-blue-600 font-semibold  hover:bg-blue-600 hover:text-white transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {!isLoading ? "Send" : "Sending..."}
                    </motion.button>
                </form>
            </div>
           </div>
        </section>
    );
};

export default Contact;