import { z } from 'zod';

export const LoggedInUserSchema = z.object({
	id: z.number(),
	nombres: z.string(),
	apellidos: z.string(),
	rut: z.string(),
	telefono: z.string(),
	correo: z.string(),
	contrasena: z.string(),
})

export type LoggedInUser = z.infer<typeof LoggedInUserSchema>