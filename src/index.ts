import { app } from "./server/Server";

app.listen( process.env.PORT||3333,()=>{
    console.log("Server running at the port 3333")
})