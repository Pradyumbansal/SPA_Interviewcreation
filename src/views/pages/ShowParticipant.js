import Utils        from './../../services/Utils.js'

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

let Participant = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let user = await getReq(request.id)
        console.log(user)
        return /*html*/`
            <section class="section">
            </section>
        `
    }
    , after_render: async () => {
    }
}

export default Participant;