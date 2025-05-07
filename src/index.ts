import express, { json } from 'express'
import { router } from './server/routes'

export const app = express()

app.use(router)
app.use(json())
