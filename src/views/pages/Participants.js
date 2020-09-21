
let getParticipants = async (url) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(url, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Participants = {
   render : async () => {
       let participants = await getParticipants(`http://localhost:3000/participants`)
       let view =  /*html*/`
           <section class="section">
               <h1> All participants </h1>
               <ul>
                    ${ participants.map(participant => 
                        ///*html*/`<li><a href="#/p/${participants.id}">${participants.id}</a></li>`
                        /*html*/`<li><a href="#/q/${participant.id}">${participant.name}</a></l1>`
                        ).join('\n ')
                    }
                </ul>
           </section>
       `
       return view
   }
   , after_render: async () => {
   }

}

export default Participants;