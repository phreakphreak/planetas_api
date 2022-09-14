import { Router } from 'express'
import { getAllPlanets, getByName, getFindOne } from '@controllers/planets'

const router = Router()

router.get('/', getAllPlanets)

router.get('/:id', getFindOne)

router.get("/name/:planetName",getByName);

export default router
