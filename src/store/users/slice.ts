import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE=[
    {
        id:"1",
        name: 'Viola Amherd',
        email: 'ViolaAmherd@mail.com',
        github:'/ViolaAmherd',
      },
      {
        id:"2",
        name: 'Albert Rösti',
        email: 'AlbertRosti@mail.com',
        github:"/AlbertRosti",
      },
      {
        id:"3",
        name: 'Beat Jans',
        email: 'BeatJans@mail.com',
        github: "BeatJans",
      },
      {
        id:"4",
        name: 'Ignazio Cassis',
        email: 'IgnazioCassis@mail.com',
        github: '/IgnazioCassis',
      },
      {
        id:"5",
        name: 'Karin Keller-Sutter',
        email: 'KarinKellerSutter@mail.com',
        github: '/KarinKeller-Sutter',
      },
      {
        id:"6",
        name: 'Guy Parmelin',
        email: 'Guy Parmelinr@mail.com',
        github:"/GuyParmelin",
      },
      {
        id:"7",
        name: 'Elisabeth Baume-Schneider',
        email: 'ElisabethBaume-Schneider@mail.com',
        github: '/ElisabethBaume-Schneider',
      },
]

export type UserId = string

export interface User {
    name: string,
    email:string,
    github: string,
}

export interface UserWithId extends User {
    id:UserId
}

 
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();


export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        addNewUser:(state,action: PayloadAction<User>) =>{
          const id = crypto.randomUUID()
          return [...state, {id, ...action.payload}]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id != id)
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
          const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
          if (!isUserAlreadyDefined) {
            state.push(action.payload)
          }
        }
    },
})

export default usersSlice.reducer

export const {addNewUser, deleteUserById, rollbackUser} = usersSlice.actions