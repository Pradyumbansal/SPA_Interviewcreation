import Utils        from './../../services/Utils.js'
import routing from '../../services/routing.js';

let getReq = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/participants/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Del = async (url, id) => {
    const options = {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(url + id, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}
let Participant = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let users = await getReq(request.id)
        console.log(users)
        console.log(users["participant"])
        let resumeData = "";
        if (users["participant"].participanttype == 'Interviewee'){
            resumeData =  users["Userresume"]
        }
        console.log(resumeData);
        return `
            <section class="section">
                <h2>${users["participant"].name}</h2><br>
                <h2>${users["participant"].email}</h2><br>
                <h2>${users["participant"].participanttype}</h2><br>
                <a href = 'http://localhost:3000${resumeData}'> resume </a>  
                <button type="button" id="delete">Delete</button>
            </section>
        `
    }
    , after_render: async () => {
        document.getElementById("delete").addEventListener ("click", async () => {      
            let request = Utils.parseRequestURL()
            let response = await Del("http://localhost:3000/participants/", request.id);
            routing.render("Participants")
        })
        
    }
}

export default Participant;