import routing from '../../services/routing.js';
import Utils        from './../../services/Utils.js'

let getReq = async (resource, id = "") => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/`+ resource +`/`+ id,  options)
       const json = await response.json();
        console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostUsers = async (data, id) => {
    const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {

       const response = await fetch(`http://localhost:3000/interviews/` + id,  options)
        console.log(response)
        const json = await response.json();
        con
        console.log(json)
        return json
        // return response
   } catch (err) {
       alert(err)
       console.log('Error getting documents', err)
   }
}

let EditInterview = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let allusers = await getReq('participants')
        let interview = await getReq('interviews', request.id)
        console.log(interview)
        let start = interview.st_time.substr(0, interview.st_time.length - 1);
        let end = interview.en_time.substr(0, interview.en_time.length - 1);
        return `
        <form >
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" value = ${start}>
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="endTime" id="endTime" value = ${end}>
            </div>
            
            <br/>
            <div>
                Choose Interviewee
                <select  selected = ${interview.id1} class="form-control" id="user_id1" name="user_id1">
                    ${allusers.map(user => {
                        if (user.participanttype == 'Interviewee') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <div>
                Choose Interviewer
                <select  selected = ${interview.id2} class="form-control" id="user_id2" name="user_id2">
                    ${allusers.map(user => {
                        if (user.participanttype == 'Interviewer') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <button type="button" id="editbutton">Edit</button>
        <form>`
    }
     

    , after_render: async () => {
        document.getElementById("editbutton").addEventListener ("click",  async () => {
            let startTime     = document.getElementById("startTime").value;
            let endTime      = document.getElementById("endTime").value;
            let Interviewee  = document.getElementById("user_id1").value;
            let Interviewer = document.getElementById("user_id2").value;
            let request = Utils.parseRequestURL()
            let data = {
                    "st_time" : startTime,
                    "en_time" : endTime,
                    "id1" : Interviewee,
                    "id2" : Interviewer,
                    "id" : request.id

            };
            const form = document.getElementById( "new_interview" );
            console.log(data);
            let response = await PostUsers(data, request.id);
            routing.render("Interviews")
            
        })
    }
}

export default EditInterview