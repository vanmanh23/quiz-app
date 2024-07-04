import React from 'react'
import { useForm } from 'react-hook-form'

type QuestionFormInput = {
    question: string
    hint: string
    testNameId: string
    answerDescription: string
    options: { text: string; isCorrect: boolean }[];
    uri?: FileList
}
type QuestFormProps = {
    onSubmit: (data: QuestionFormInput) => void
}
export default function QuestForm({ onSubmit }: QuestFormProps) {
    const { register, handleSubmit } = useForm<QuestionFormInput>()
  return (
    <div className="w-full md:w-full flex flex-col">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 w-full">
    <label className="">Question</label>
    <input type="text" {...register("question")} className="focus:no-underline rounded-lg"/>
    {
      Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-1'>
          <label className="">Option {index + 1}</label>
          <input type="text" {...register(`options.${index}.text`)} className="focus:no-underline rounded-lg" />
          <div className="flex flex-row gap-2">
            <label className="">Is correct</label>
            <input type="checkbox" {...register(`options.${index}.isCorrect`)} className="focus:no-underline rounded-lg" />
          </div>
        </div>
      ))
    }
    <label className="">Answer description</label>
    <input type="text" {...register("answerDescription")} className="focus:no-underline rounded-lg"/>
    <label className="">Hint</label>
    <input type="text" {...register("hint")} className="focus:no-underline rounded-lg"/>
    <label className="">Image(optional)</label>
    <input type="file" {...register("uri")} className="focus:no-underline rounded-lg"/>
    <button type="submit" className="bg-third mt-4 text-white font-bold py-2 px-4 rounded">Submit</button>
</form>
</div>
  )
}
