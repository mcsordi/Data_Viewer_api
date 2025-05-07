import { app } from '.'

app.listen(process.env.PORT || 3333, () => {
  console.log(`server running at port ${process.env.PORT || 3333}`)
})
