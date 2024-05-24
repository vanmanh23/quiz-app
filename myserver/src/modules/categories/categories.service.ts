import { db } from "../../lib/db";
import { Image, type TestName } from "@prisma/client";

export class CategoriesService {
  static async getAll() {
    const data = await db.testName.findMany({include: {image: {
      select: {
        uri: true,
        alt: true
      }
    }}});
    return data;
  }
  static async getById(id: string) {
    const data = await db.testName.findUnique({ where: { id }, include: {image: {
      select: {
        uri: true,
        alt: true
      }
    }} });
    return data;
  }
  static async create(data: TestName) {
    try{
    const result = await db.testName.create({ data });

    return result;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  static async getByTestName(testName: string) {
    const data = await db.testName.findFirst({where: {testName: testName}, include: {
      image: {
        select: {
          uri: true,
          alt: true
        }
      },
      question: {
        select: {
          id: true,
          question: true,
          answerDescription: true,
          hint: true,
          options: true,
          image: true
        }
      }
    } })
    return data;
  }
  static async deleteById(id: string) {
    try{
      const result = await db.testName.delete({ where: { id }, include: {image: {
        select: {
          uri: true,
          alt: true
        }
      }}});
    }
     catch(err){
      console.log(err);
      throw err;
    }
}
static async imagecreate(data: Image) {
  try{
  const result = await db.image.create({ data });

  return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}
}