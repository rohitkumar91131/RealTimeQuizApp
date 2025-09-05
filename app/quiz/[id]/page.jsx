"use client"
import QuizLeaderBoard from '@/app/components/QuizPage/QuizLeaderBoard'
import QuizQuestionTab from '@/app/components/QuizPage/QuizQuestionTab'
import QuizScore from '@/app/components/QuizPage/QuizScore'
import { useSocket } from '@/app/context/SocketContext'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

function QuizPage() {
    const {socket} = useSocket(); 
    useEffect(()=>{
        if(socket && !socket.connected){
          socket.connect();
        }

        return ()=>{
            if (socket && socket.connected) {
                socket.disconnect();
            }
        }
    },[])
  return (
    <div className='!mt-[10dvh] w-[100dvw] h-[90dvh] grid grid-cols-3 '>
      <div>
      <QuizScore/>
      </div>
      <div>
      <QuizQuestionTab/>
      </div>
      <div>
      <QuizLeaderBoard/>
      </div>
    </div>
  )
}

export default QuizPage
