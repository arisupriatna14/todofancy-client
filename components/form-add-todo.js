Vue.component('form-todo', {
  template: `
    <div>
      <form @submit.prevent="addTodo">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" class="form-control" v-model="due_date">
        </div>
        <div class="form-group">
          <label>Category</label>
          <input type="text" class="form-control" v-model="category">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="sendEmail">
          <label class="form-check-label" for="defaultCheck1">
            Send remainder
          </label>
        </div><br>
        <button type="submit" class="btn btn-primary">Add Todo</button>
      </form>
    </div>
  `, 
  data: function() {
    return {
      title: '',
      due_date: '',
      category: '',
      sendEmail: false
    }
  },

  methods: {
    addTodo: function() {
      axios({
        method: 'POST',
        url: 'http://todofancy-api.arisupriatna.com/api/todo/add',
        data: {
          title: this.title,
          due_date: this.due_date,
          category: this.category,
          sendEmail: this.sendEmail
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          swal('Add todo success', '', 'success')
          setTimeout(() => {
            window.location = 'http://localhost:8080/index.html'
          }, 2000)
        })
        .catch(err => {
          swal('Add todo failed', 'Try again!', 'error')
        })
    }
  }
})