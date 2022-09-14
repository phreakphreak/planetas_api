import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getAllPlanets = async (req: Request, res: Response) => {
	const planets = await prisma.planet.findMany()

	return res.json(planets)
}

export const getFindOne = async (req: Request, res: Response) => {
	const { id } = req.params
	const planetParams =
		id.charAt(0).toUpperCase() + id.slice(1).toLowerCase().trim()

	const planet = await prisma.planet.findUnique({
		where: { id: planetParams },
		include: {
			geology: true,
			images: true,
			overview: true,
		},
	})
	if (!planet)
		return res.status(404).send(`Not found this planet: ${planetParams}`)

	return res.json(planet)
}
export const getByName = async (req: Request, res: Response) => {
	const { planetName } = req.params

	const planet = await prisma.planet.findFirst({
		where: {
			name: {
				startsWith: planetName,
				mode:"insensitive"
			},
		},
		include: {
			geology: true,
			images: true,
			overview: true,
			structure: true,
		},
	})
	if (!planet)
		return res.status(404).send(`Not found this planet: ${planetName}`)

	return res.json(planet)
}
