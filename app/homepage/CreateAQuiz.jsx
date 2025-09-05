"use client"

import { useEffect, useState } from "react"
import { ArrowLeft ,PlusCircle, User, Users, CheckCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import { useSocket } from "../context/SocketContext"

function CreateAQuiz() {
  const [showQuizType, setShowQuizType] = useState(false)
  const [selectedQuizHostType, setSelectedQuizType] = useState("")
  const [showInputAndSubmitButton, setShowInputAndSubmitButton] = useState(false)
  const [lastType, setLastType] = useState("")
  const [showReturnButton , setShowReturnButton] = useState(false);
  const [formData , setFormData ] = useState({
    name: "",
    type : "",
    no_of_questions : 1,
  })
  const [name , setName] = useState("Bro");
  const {socket} = useSocket();

  useEffect(()=>{
    async function getMyName(){
      try{
        const res = await fetch(`http://localhost:4000/user/me`,{
          method : "GET",
          credentials : "include"
        })
        const data = await res.json();
        setName(data.user.name)
      }
      catch(err){
        console.log(err.message)
      }
    }
    getMyName()
  },[])

  useEffect(() => {
    if (!socket) return;

    socket.on("auth_error", (err) => toast.error(err));
    socket.on("connect_error", (err) => toast.error(err.message));
    socket.on("quiz_created",(res)=> toast.success(`Quiz created: ${res.quizId}`));
    socket.on("quiz_error",(err)=> toast.error(err));

    return () => {
      socket.off("auth_error");
      socket.off("connect_error");
      socket.off("quiz_created");
      socket.off("quiz_error");
    }
  }, [socket]);

  const handleCreateQuiz = () => {
    setShowQuizType(true)
    setShowReturnButton(true)
  }

  const handleSelectQuizHostType = (type) => {
    if (type === lastType) {
      setSelectedQuizType("")
      setLastType("")
      setShowInputAndSubmitButton(false);
      setFormData((prev) => ({ ...prev , type : "" }))
    } else {
      setSelectedQuizType(type)
      setLastType(type)
      setShowInputAndSubmitButton(true)
      setFormData(prev => ({ ...prev , type }))
    }
  }

  const handleReturnClick = ()=>{
    setShowQuizType(false)
    setShowInputAndSubmitButton(false)
    setShowReturnButton(false)
    setFormData({ name:"", type:"", no_of_questions: 1})
    setSelectedQuizType("")
    setLastType("")
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()
    if(!formData.name.trim()){
      toast.error("Enter quiz name")
      return
    }
    if(!formData.no_of_questions || formData.no_of_questions < 1 || formData.no_of_questions > 10){
      toast.error("Number of questions must be 1-10")
      return
    }
    if(!formData.type){
      toast.error("Select quiz type")
      return
    }
    if(!socket.connected){
      toast.error("Socket not connected");
      return
    }

    const isPrivate = formData.type === "personal"; 
    
    socket.emit("create_a_quiz", { 
      name: formData.name,
      type: formData.type, 
      no_of_questions: Number(formData.no_of_questions),
      isPrivate
    });
  }

  return (
    <div className="!mt-[10dvh] h-fit !p-5 w-full flex items-center justify-center flex-col gap-4 transition-all duration-500">
      
      <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        {showReturnButton && (
          <ArrowLeft 
            size={24} 
            className="cursor-pointer hover:text-indigo-500 transition-colors" 
            onClick={handleReturnClick}
          />
        )}
        Hey {name}! Wanna Create a Quiz?
      </p>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:scale-105 transition-transform shadow-md"
        onClick={handleCreateQuiz}
      >
        <PlusCircle size={20} /> Create one with Sara
      </button>

      {showQuizType && (
        <div className="flex flex-col items-center gap-3 mt-4 w-full transition-all duration-500">
          <input
            className="border rounded-xl px-3 py-2 w-[70%] max-w-md focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            placeholder="Enter quiz name"
            value={formData.name}
            onChange={(e)=> setFormData(prev => ({ ...prev , name: e.target.value }))}
            required
          />
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all duration-300 ${
              selectedQuizHostType === "personal"
                ? "bg-purple-100 scale-105 border-purple-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleSelectQuizHostType("personal")}
          >
            <User size={20} /> For myself (Private)
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all duration-300 ${
              selectedQuizHostType === "host"
                ? "bg-indigo-100 scale-105 border-indigo-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleSelectQuizHostType("host")}
          >
            <Users size={20} /> Host a Quiz (Public)
          </button>
        </div>
      )}

      {showInputAndSubmitButton && (
        <form className="flex flex-col items-center gap-3 w-full transition-all duration-500" onSubmit={handleFormSubmit}>
          <input
            className="border rounded-xl px-3 py-2 w-[60%] max-w-xs focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            type="number"
            placeholder="Enter number of questions (max 10)"
            max="10"
            min="1"
            value={formData.no_of_questions}
            onChange={(e)=> setFormData(prev=> ({ ...prev , no_of_questions : Number(e.target.value)}))}
            required
          />
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:scale-105 transition-transform shadow-md"
              type="submit"
          >
            <CheckCircle size={20} /> Create
          </button>
        </form>
      )}

    </div>
  )
}

export default CreateAQuiz
