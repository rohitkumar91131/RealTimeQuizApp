"use client"

import { useEffect, useState } from "react"
import { ArrowLeft ,PlusCircle, User, Users, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"

function CreateAQuiz() {
  const [showQuizType, setShowQuizType] = useState(false)
  const [selectedQuizHostType, setSelectedQuizType] = useState("")
  const [showInputAndSubmitButton, setShowInputAndSubmitButton] = useState(false)
  const [lastType, setLastType] = useState("")
  const [showReturnButton , setSHowReturbButton] = useState(false);
  const [formData , setFormData ] = useState({
    type : "",
    no_of_questions : 1,
  })

  useEffect(()=>{
    toast("hi")
  },[])
  const handleCreateQuiz = () => {
    setShowQuizType(true)
    setSHowReturbButton(true)
  }

  const handleSelectQuizHostType = (type) => {
    if (type === lastType) {
      setSelectedQuizType("")
      setLastType("")
      setShowInputAndSubmitButton(false);
      setFormData((prev) =>({
        ...prev , 
        type : ""
      }))
    } else {
      setSelectedQuizType(type)
      setLastType(type)
      setShowInputAndSubmitButton(true)
      setFormData(prev =>( {
        ...prev ,
        type : type
      }))
    }
  }

  const handleReturnClick = ()=>{
    setShowQuizType(false)
    setShowInputAndSubmitButton(false)
    setSHowReturbButton(false)
  }

  const checkNumber = (number) =>{
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()
    if(!formData.no_of_questions){
      toast("Enter no of question")
      return
    }
    if(!formData.type){
      toast("Write type")
      return
    }
  }

  return (
    <div className=" min-h-[50vh] !p-5  w-full flex items-center justify-center  flex-col gap-4  transition-all duration-500">
      
      <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        {showReturnButton && (
          <ArrowLeft 
            size={24} 
            className="cursor-pointer hover:text-indigo-500 transition-colors" 
            onClick={handleReturnClick}
          />
        )}
        Hey Rohit! Wanna Create a Quiz?
      </p>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:scale-105 transition-transform shadow-md"
        onClick={handleCreateQuiz}
      >
        <PlusCircle size={20} /> Create one with Sara
      </button>

      {showQuizType && (
        <div className="flex flex-col items-center gap-3 mt-4 w-full transition-all duration-500">
          <button
            className={`flex  items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all duration-300 ${
              selectedQuizHostType === "nohost"
                ? "bg-purple-100 scale-105 border-purple-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleSelectQuizHostType("nohost")}
          >
            <User size={20} /> For myself
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all duration-300 ${
              selectedQuizHostType === "host"
                ? "bg-indigo-100 scale-105 border-indigo-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleSelectQuizHostType("host")}
          >
            <Users size={20} /> Host a Quiz
          </button>
        </div>
      )}

      {showInputAndSubmitButton && (
        <form className="flex flex-col items-center gap-3  w-full transition-all duration-500" onSubmit={handleFormSubmit}>
          <input
            className="border rounded-xl  px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            type="number"
            placeholder="Enter number of questions (max 10)"
            max="10"
            min="1"
            required
            value={formData?.no_of_questions}
            onChange={(e)=> setFormData(prev=>( { ...prev , no_of_questions : e.target.value}))}
          />
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:scale-105 transition-transform shadow-md `}>
            <CheckCircle size={20} /> Create
          </button>
        </form>
      )}
      {
        JSON.stringify(formData)
      }
    </div>
  )
}

export default CreateAQuiz
