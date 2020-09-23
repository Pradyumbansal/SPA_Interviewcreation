import routing from '../../services/routing.js';
import Utils        from './../../services/Utils.js'

let PostUsers = async (data) => {
    // let form = new FormData();
    // form.append('file', resume)
    const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {
       const response = await fetch(`http://localhost:3000/participants/`,  options)
       const json = await response.json();
        console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let NewParticipant = {
    

    render: async () => {
        
        return `
        <form id = "myForm">
            <div>
                Name
                <input class="form-control" type="text"  name="name" id="name" >
            </div>
                <br/>
            <div>
                Email
            <input class="form-control" type="text" name="email" id="email" >
            </div>
            <br/>
            <div id = "participanttype">
                Choose Participant Type
                <br/>
                    <input type="radio" id="interviewee" name="participanttype" value="Interviewee">
                    <label for="Interviewee">Interviewee</label><br>
                    <input type="radio" id="interviewer" name="participanttype" value="Interviewer">
                    <label for="Interviewer">Interviewer</label><br>
            </div>
            <div id = "temp">
                Attach resume
                <input type = "file" name = "resume" id = "resume" accept="application/pdf,application/vnd.ms-excel">
            </div>
            <button type="button" id="AddParticipant">CREATE</button>
        <form>`
    }
     

    , after_render: async () => {
        let store = document.getElementById("temp").innerHTML;
        document.getElementById("interviewer").addEventListener ("click", async () => {
            document.getElementById("temp").innerHTML = ""
        })
        document.getElementById("interviewee").addEventListener ("click", async () => {
            document.getElementById("temp").innerHTML = store
        })
        
        document.getElementById("AddParticipant").addEventListener ("click",  async () => {
            let name     = document.getElementById("name").value;
            let email      = document.getElementById("email").value;
            let participanttype = document.getElementById("interviewee").checked ? "Interviewee" : "Interviewer";
            let resume = document.getElementById("resume")
            let data = {
                    "name" : name,
                    "email" : email,
                    "participanttype" : participanttype,
                    "resume" : resume           
            };
            // let myForm = document.getElementById('myForm');
            // console.log(myForm["resume"].value)
            // let formData = new FormData(myForm);
            // console.log(formData);
            let response = await PostUsers(data);
            routing.render("Participants")
            
        })
    }
}

export default NewParticipant