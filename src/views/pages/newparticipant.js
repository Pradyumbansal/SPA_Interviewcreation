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
        <form id = "new_interview" method="post" enctype='multipart/form-data'>
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
            <input type="submit" value="Create Interview">
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
        function sendData(form) {
            const XHR = new XMLHttpRequest();
            const FD = new FormData( form );
            console.log(FD)
            XHR.addEventListener( "load", function(event) {
                console.log(event)
                console.log(event.response)
                routing.render("Participants")
            } );
            // Define what happens in case of error
            // XHR.addEventListener( "error", function( event ) {
            // alert( 'Oops! Something went wrong.' );
            // } );
            // Set up our request
            XHR.open( "POST", "http://localhost:3000/participants" );
            XHR.send( FD );
        }
        const form = document.getElementById( "new_interview" );
        console.log(form.elements)
        form.addEventListener( "submit", function ( event ) {
            event.preventDefault();
            sendData(form);
        });
    }
    // , after_render: async () => {
    //     let store = document.getElementById("temp").innerHTML;
    //     document.getElementById("interviewer").addEventListener ("click", async () => {
    //         document.getElementById("temp").innerHTML = ""
    //     })
    //     document.getElementById("interviewee").addEventListener ("click", async () => {
    //         document.getElementById("temp").innerHTML = store
    //     })
        
    //     document.getElementById("AddParticipant").addEventListener ("click",  async () => {
    //         let name     = document.getElementById("name").value;
    //         let email      = document.getElementById("email").value;
    //         let participanttype = document.getElementById("interviewee").checked ? "Interviewee" : "Interviewer";
    //         let resume = document.getElementById("resume")
    //         let data = {
    //                 "name" : name,
    //                 "email" : email,
    //                 "participanttype" : participanttype,
    //                 "resume" : resume           
    //         };
    //         // let myForm = document.getElementById('myForm');
    //         // console.log(myForm["resume"].value)
    //         // let formData = new FormData(myForm);
    //         // console.log(formData);
    //         let response = await PostUsers(data);
    //         routing.render("Participants")
            
    //     })
    // }
}

export default NewParticipant