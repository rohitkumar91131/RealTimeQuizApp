import Head from "next/head"
import Header from "./components/Header"
import CreateAQuiz from "./homepage/CreateAQuiz"


function page() {
  return (
    <div className="!mt-[50px] sm:!mt-[64px] grid grid-cols-1 sm:grid-cols-2">
       <CreateAQuiz/>
    </div>
  )
}

export default page
