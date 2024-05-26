import { db } from "@/lib/db";
import { TestName} from "@prisma/client";

export class CategoriesService {
  static async getAll() {
    const data = await db.testName.findMany({});
    return data;
  }
  static async create(data: TestName){   
    try {
      const category = await db.testName.create({data});
      return category;   
        } catch (error) {
          console.log(error);
          throw error;
        } 
  }
  static async update(id: string, data: TestName) {
    try{
      const category = await db.testName.update({where: {id}, data});
      return category;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
}