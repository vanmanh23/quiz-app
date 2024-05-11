import { db } from "../lib/db";
import { type FlagTest } from "@prisma/client";

export class CategoriesService {
  static async getAll() {
    const data = await db.flagTest.findMany({});
    return data;
  }
  static async getById(id: number) {
    const data = await db.flagTest.findUnique({ where: { id }, include: {image: {
      select: {
        uri: true,
        alt: true
      }
    }} });
    return data;
  }
  static async create(data: FlagTest) {
    try{
    const result = await db.flagTest.create({ data });

    return result;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  static async deleteById(id: number) {
    try{
      const result = await db.flagTest.delete({ where: { id }, include: {image: {
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
}