Vue.component("list-event", {
  template: `
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12" v-for="event in events">
        <div class="card">
          <img :src="event.imgUrl" alt="" class="card-img-top" :style="{height:  height + 'rem', objectFit: objectFit}">
          <div class="card-body">
            <p>{{ event.title }}</p>
            <span class="text-muted">{{ event.dateConvert }} - {{ new Date(event.due_date).toLocaleDateString() }}</span><br><br>
            <button @click="addTodo(event.title, event.due_date)" class="btn btn-primary btn-sm">Add Todo</button>
            <button @click="descriptions(event.title, event.description, event.imgUrl)" class="btn btn-primary btn-sm">Description</button>
          </div>
        </div>
        <br>
      </div>
    </div>
  `,
  data: function() {
    return {
      todos: [],
      statusTodo: "",
      events: [],
      height: 10,
      objectFit: 'cover'
    };
  },

  methods: {
    getAllEvent: function() {
      axios({
        method: "GET",
        url: "http://todofancy-api.arisupriatna.com/api/todo/events"
      })
        .then(result => {
          result.data.data.events.forEach(event => {
            if (event.logo) {
              this.events.push({
                title: event.name.text,
                date: event.start.utc,
                dateConvert: new Date(event.start.utc).toLocaleDateString(),
                due_date: event.end.utc,
                imgUrl: event.logo.original.url,
                description: event.description.text
              });
            } else {
              this.events.push({
                title: event.name.text,
                date: event.start.utc
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTodo: function(title, due_date) {
      axios({
        method: "POST",
        url: "http://todofancy-api.arisupriatna.com/api/todo/add",
        data: {
          title: title,
          due_date: due_date,
          category: "Event"
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          swal("Add todo success", "", "success");
          setTimeout(() => {
            window.location = "http://todofancy.arisupriatna.com/index.html";
          }, 2000);
        })
        .catch(err => {
          swal("Add todo failed", "Try again!", "error");
        });
    },
    descriptions: function(title, description, image) {
      swal({
        title: title,
        text: description,
        icon: image,
        imageAlt: "Custom image"
      });
    }
  },

  mounted() {
    this.getAllEvent();
  }
});
