import Utils        from '../../services/Utils.js'

let getReq = async (resource, id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/` + resource + `/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let InterviewShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let interview = await getReq('interviews', request.id)
        let interviewee = await getReq('participants', interview.id1)
        let interviewer = await getReq('participants', interview.id2)
        
        return /*html*/`
            <section class="section">
                <h1> Interview Start time : ${interview.st_time}</h1>
                <p> Interview End time : ${interview.en_time} </p>
                <p> Interviewee Name : ${interviewee.name} </p> 
                <p> Interviewer Name : ${interviewer.name} </p>
            </section>
        `
    }
    , after_render: async () => {
    }
}

export default InterviewShow;