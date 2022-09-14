import express, { Application } from 'express'
import planetsRoutes from '@routes/planets'

class Server {
	private app: Application
	private port: string
	private apiPaths = {
		planet: '/api/planet',
	}

	constructor() {
		this.app = express()
		this.port = process.env.PORT || '8000'

		this.routes()
	}

	routes() {
		this.app.use(this.apiPaths.planet, planetsRoutes)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on http://localhost:${this.port}`)
		})
	}
}

export default Server
