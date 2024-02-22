/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Middleware, configureStore } from '@reduxjs/toolkit';
import usersReducer,{rollbackUser} from './users/slice';
import { toast } from 'sonner';

const persistanceLocalStorageMiddleware:Middleware = store => next => action => {
  next(action);
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};


const syncWithDatabaseMiddleware: Middleware = store => next => action => {
	const { type, payload } = action
	const previousState = store.getState() as RootState
	next(action)

	if (type === 'users/deleteUserById') { // <- delete user
		const userIdToRemove = payload
		const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: 'DELETE'
		})
			.then(res => {
				// if (res.ok) {
				// 	toast.success(`Usuario ${payload} eliminado correctamente`)
				// }
				throw new Error('Error al eliminar el usuario')
			})
			.catch(err => {
				toast.error(`Error deleting user ${userIdToRemove}`)
				if (userToRemove) store.dispatch(rollbackUser(userToRemove))
				console.log(err)
				console.log('error')
			})
	}
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware), // Coloca el middleware en un array
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
