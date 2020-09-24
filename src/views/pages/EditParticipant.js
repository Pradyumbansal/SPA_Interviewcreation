import Utils        from './../../services/Utils.js'
import routing from '../../services/routing.js';

let PostUsers = async (data, id) => {
    const options = {
       method: 'PATCH',
       body: data
   };
   try {
       const response = await fetch(`http://localhost:3000/participants/` + id,  options)
       const json = await response.json();
       console.log(response)
       console.log(json)
       if (response.status == 401) {
           var o = json;
           for (var key in o) {
               if (o.hasOwnProperty(key)) {
                   alert(key, o[key]);
               }
           }   
       }
       json["status"] = response.status;
       return json
   } catch (err) {
       alert(err)
       console.log('Error getting documents', err)
   }
}
let GetUsers = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/participants/` + id,  options)
       const json = await response.json();
        console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}
let EditParticipant = {
    
    render: async () => {
        let request = Utils.parseRequestURL()
        let user = await GetUsers(request.id)
        return `
        <form id = "edit_participant">
            <div>
                Name
                <input class="form-control" type="text"  name="name" id="name" value = ${user["participant"].name}>
            </div>
                <br/>
            <div>
                Email
            <input class="form-control" type="text" name="email" id="email" value = ${user["participant"].email}>
            </div>
            <br/>
            <div id = "participanttype" >
                Choose Participant Type
                <br/>
                    <input type="radio" id="interviewee" name="participanttype" value="Interviewee">
                    <label for="Interviewee">Interviewee</label><br>
                    <input type="radio" id="interviewer" name="participanttype" value="Interviewer">
                    <label for="Interviewer">Interviewer</label><br>
            </div>
            <div id = "temp">
                Attach resume
                <input type = "file" name = "resume" id = "resume" accept="application/pdf,application/vnd.ms-excel" >
            </div>
            <button type="button" id="edit">EDIT</button>
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
        
        document.getElementById("edit").addEventListener ("click",  async () => {
     
            let request = Utils.parseRequestURL()
            
            const form = document.getElementById( "edit_participant" );
            const FD = new FormData( form );
            console.log(FD);
            let response = await PostUsers(FD, request.id);
            if (response["status"] != 401)
            routing.render("Participants")

        })
    }
}

export default EditParticipant