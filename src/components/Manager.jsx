import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid'
const Manager = () => {
  const passwordRef = useRef();
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
      
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.jpg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    setForm({site:"",username:"",password:""})
    console.log([...passwordArray, form]);
    toast('Password saved Successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
  };

  const deletePassword=(id)=>{
     console.log("Deleting password with id",id)
     let c=confirm("Do you really want to delete the password?")
     if(confirm){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
     localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
     toast('Password Deleted Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
     }
     
  }

  const editPassword=(id)=>{
    console.log("Editing password with id",id)
    setForm(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    
 }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
   <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
      <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="    mycontainer ">
        <h1 className="text-4xl text font-bold text-center">
          {" "}
          <span className="text-green-500"> &lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager{" "}
        </p>
        <div className=" flex flex-col p-4 gap-4 text-black items-center ">
          <input
            className="rounded-full  border border-green-500 w-full p-4 py-1"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full  border border-green-500 w-full p-4 py-1"
              placeholder="Enter username"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full  border border-green-500 w-full p-4 py-1 "
                placeholder="Enter Password"
                type="password"
                name="password"
                id=""
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  className="p-1 "
                  ref={ref}
                  width={28}
                  src="icons/eye.jpg"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border-2 border-green-900"
          >
           <lord-icon
    src="https://cdn.lordicon.com/sbnjyzil.json"
    trigger="hover"
    stroke="bold"
    >
</lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    {/* Site Column */}
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="lordicon cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
    src="https://cdn.lordicon.com/depeqmsz.json"
    trigger="hover"
></lord-icon>
                        </div>
                      </div>
                    </td>

                    {/* Username Column */}
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{item.username}</span>
                        <div
                          className=" lordicon cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
    src="https://cdn.lordicon.com/depeqmsz.json"
    trigger="hover"
></lord-icon>
                 
                        </div>
                      </div>
                    </td>

                    {/* Password Column */}
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{item.password}</span>
                        <div
                          className=" lordicon cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                           <lord-icon
    src="https://cdn.lordicon.com/depeqmsz.json"
    trigger="hover"
></lord-icon>
                 
                        </div>
                      </div>
                    </td>

                    <td className="py-2 border border-white text-center " >
                       <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                        
                       <lord-icon
    src="https://cdn.lordicon.com/wkvacbiw.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>

<span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
<lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon>
</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
