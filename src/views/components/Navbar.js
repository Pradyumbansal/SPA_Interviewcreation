let Navbar = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                  

                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                All Interviews
                            </a>
                            <a class="navbar-item" href="/#/participants">
                                All Participants
                            </a>
                        </div>
                        
                    </div>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;