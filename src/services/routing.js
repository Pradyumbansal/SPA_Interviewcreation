const routing = {
    mapping : {},

    render :  (path, id = "") => {
        path = routing.mapping[path]
        location.replace(path)
    }

}

export default routing
