import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React, { useContext, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import QuestForm from './QuestForm'
import { TestsContext } from '../../../../utils/testContext'
import { numberOfQuestionContextShape } from '../../../../utils/durationContext'
import { createOption, createQuestion } from '@/api/questions'
import { createImage } from '@/api/images'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type QuestionFormInput = {
    question: string
    hint: string
    testNameId: string
    answerDescription: string
    options: { text: string; isCorrect: boolean }[];
    uri?: FileList
}
export default function QuestionsForm() {
  const [count, setCount] = useState(1);
  const { test } = useContext(TestsContext);
  const {numberOfQuestion} = useContext(numberOfQuestionContextShape);
  const { toast } = useToast();
  console.log("test in questionsForm file: ", test)
  const countHandler = () => {
    setCount(count + 1);
    console.log("currunt count: ", count);
  }
     const onSubmit: SubmitHandler<QuestionFormInput> = async (data) => {
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };
        const questionsData = {
            question: data.question,
            hint: data.hint,           
            answerDescription: data.answerDescription,
            testNameId: test
        }
        console.log("questionsData: ", questionsData)
        try {
          const questionhadmaked = await createQuestion(questionsData)

          
          data.options.map(async (option) => {
            const optionWithQuestionId = {
              text: option.text,
              isCorrect: option.isCorrect,
              questionId: questionhadmaked?.newQuestion?.id
            };
            console.log("optionWithQuestionId: ", option)
            await createOption(optionWithQuestionId);
          });

          if (data?.uri && data.uri.length > 0) {
            const base64Uri = await fileToBase64(data.uri[0]);
            const formpicture = {
              uri: base64Uri,
              alt: test,
              questionId: questionhadmaked?.newQuestion?.id,
            }
            console.log("findtestid: ", String(count))
            console.log("formpicture: ", formpicture)
            const imagemaked = await createImage(formpicture)
            console.log("imagemaked: ", imagemaked)
            // Rest of the code...
          } 
          console.log("questionhadmaked: ", questionhadmaked)
          toast({
            title: "Create question successfully",
            style: {
              color: "#27ae60", // Set your desired text color
            },
          })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
         <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: numberOfQuestion }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <QuestForm  onSubmit={onSubmit}/>
            </div>
            {
              index == 9 && <div>
                <Link to="/" className="flex justify-center">
                <Button className='bg-green-600 text-white'>Confirm</Button>
                </Link>
              </div>
            }
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <div onClick={countHandler}><CarouselNext /></div>
      
    </Carousel>
    </div>
  )
}
