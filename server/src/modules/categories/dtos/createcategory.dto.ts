import z from 'zod'

export const createCategoryDtos = z.object({
    name: z.string(
        {required_error: 'name is required'}
    ),
    icon: z.string({required_error: 'icon is required'})
})