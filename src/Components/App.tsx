import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoRequest } from '../Store/Todo/actions';
import {
   getErrorSelector,
   getPendingSelector,
   getTodosSelector,
} from '../Store/Todo/selectors';

const App = () => {
   const pending = useSelector(getPendingSelector);
   const todos = useSelector(getTodosSelector);
   const error = useSelector(getErrorSelector);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchTodoRequest());
   }, [dispatch]);
   return (
      <>
         {pending ? (
            <div>Loading...</div>
         ) : error ? (
            <div>Error!</div>
         ) : (
            todos?.map(({ id, title }) => <div key={id}>{title}</div>)
         )}
      </>
   );
};

export default App;
