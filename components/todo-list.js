Vue.component('todo-list', {
  template: `
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos">
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="todo.status">
              </div>
            </td>
            <td>{{ todo.title }}</td>
            <td>{{ todo.due_date }}</td>
            <td>{{ todo.category }}</td>
            <td>
              <button class="btn btn-primary" @click="deleteTodo(todo.id)">
                <i class="fa fa-trash-o"></i>
              </button>
              <button class="btn btn-primary" data-toggle="modal" @click="dataUpdateTodolist(todo.id)" data-target="#exampleModalCenter">
                <i class="fa fa-undo"></i>
              </button>
              
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form v-on:submit.prevent>
                        <div class="form-group">
                          <label>Title</label>
                          <input type="text" class="form-control" v-model="dataUpdate.title" ref="title">
                        </div>
                        <div class="form-group">
                          <label>Due Date</label>
                          <input type="text" class="form-control"  v-model="dataUpdate.due_date">
                        </div>
                        <div class="form-group">
                          <label>Category</label>
                          <input type="text" class="form-control" v-model="dataUpdate.category">
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="dataUpdate.status">
                          <label class="form-check-label" for="defaultCheck1">
                            Status
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="sendEmail">
                          <label class="form-check-label" for="defaultCheck1">
                            Send remainder
                          </label>
                        </div><br>
                        <button type="submit" class="btn btn-primary" @click="updateTodo(dataUpdate.id)">Update Todo</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data: function() {
    return {
      todos: [],
      dataUpdate: {},
      title: '',
      category: '',
      due_date: '',
      sendEmail: false
    }
  },
  methods: {
    todoList: function () {
      axios({
        method: 'GET',
        url: 'http://todofancy-api.arisupriatna.com/api/todo/mytodolist',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          result.data.todoList.forEach(todo => {
            this.todos.push({
              id: todo._id,
              title: todo.title,
              due_date: new Date(todo.due_date).toLocaleDateString(),
              category: todo.category,
              status: todo.status
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    dataUpdateTodolist: function(id) {
      axios({
        method: 'GET',
        url: `http://todofancy-api.arisupriatna.com/api/todo/mytodolist/${id}`
      })
        .then(result => {
          this.dataUpdate = {
            id: result.data.todoList._id,
            status: result.data.todoList.status,
            title: result.data.todoList.title,
            category: result.data.todoList.category,
            due_date: result.data.todoList.due_date
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateTodo: function(id) {
      // event.preventDefault()
      axios({
        method: 'PUT',
        url: `http://todofancy-api.arisupriatna.com/api/todo/mytodolist/${id}`,
        data: {
          title: this.dataUpdate.title,
          due_date: this.dataUpdate.due_date,
          status: this.dataUpdate.status,
          category: this.dataUpdate.category
        }
      })
        .then(() => {
          swal('Update todo success', '', 'success')
          setTimeout(() => {
            window.location = 'http://todofancy.arisupriatna.com/index.html'
          }, 2000)
        })
        .catch(err => {
          swal('Update failed', 'Try again!', 'error')
        })
    },

    deleteTodo: function(id) {
      axios({
        method: 'DELETE',
        url: `http://todofancy-api.arisupriatna.com/api/todo/mytodolist/${id}`
      })
        .then(() => {
          swal('Delete todo success', '', 'success')
          setTimeout(() => {
            window.location = 'http://todofancy.arisupriatna.com/index.html'
          }, 2000)
        })
        .catch(err => {
          swal('Delete failed', 'Try again!', 'error')
        })
    }
  },
  mounted() {
    this.todoList()
  },
})