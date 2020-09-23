"use strict";

import Interviews   from './views/pages/Interviews.js'
import Error404     from './views/pages/Error404.js'
import InterviewShow     from './views/pages/InterviewShow.js'
import Participants from './views/pages/Participants.js'
import ShowParticipant from './views/pages/ShowParticipant.js'
import Navbar       from './views/components/Navbar.js'
import Bottombar    from './views/components/Bottombar.js'
import NewInterview        from './views/pages/newInterview.js'
import Utils        from './services/Utils.js'
import NewParticipant from './views/pages/NewParticipant.js'
import EditParticipant from './views/pages/EditParticipant.js'
import EditInterview from './views/pages/EditInterview.js'
import routing from './services/routing.js'


const routes = {
    '/'              : Interviews
    , '/p/:id'       : InterviewShow
    , '/participants' : Participants
    , '/q/:id'      : ShowParticipant
    , '/new_interview' : NewInterview
    , '/new_participant' : NewParticipant
    , '/edit_participant/:id' : EditParticipant
    , '/edit_interview/:id' : EditInterview
};

routing.mapping = {
    "Interviews" : '/', 
    "InterviewShow" : '#/p/:id',
    'Participants' : '#/participants',
    'ShowParticipant' : '#/q/:id', 
    'NewInterview' : '#/new_interview',
    'NewParticipant' : '#/new_participant',
    "EditParticipant" : '#/edit_participant/:id',
    "EditInterview" : '#/edit_interview/:id' 
}


const router = async () => {

    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    console.log(parsedURL)
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
