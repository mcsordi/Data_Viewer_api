import * as read from "./people/Read"
import * as create from "./people/Create"
import * as Delete from "./people/Delete"
import * as update from "./people/Update"

export const peopleController={
    ...read,
    ...create,
    ...Delete,
    ...update 
}