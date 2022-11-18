// import {createServer, Model} from 'miragejs';

// export const setupServer = () => {
//   const server = createServer({
//     models: {
//       todos: Model,
//     },
//     routes() {
//       this.get('/api/todos', schema => {
//         return schema.todos.all();
//       });
//       this.post('/api/todos', (schema, request) => {
//         console.log(`requestBody: ${request.requestBody}`);

//         const payload = JSON.parse(request.requestBody);
//         return schema.todos.create(payload);
//       });

//       this.post('/api/updateTodo', (schema, request) => {
//         const id = JSON.parse(request.requestBody);
//         const currentTodo = schema.todos.find(id);
//         currentTodo.update({isCompleted: currentTodo.isCompleted});
//       });
//     },
//   });
// };
