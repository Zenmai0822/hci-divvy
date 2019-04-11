export default class BackendService { 

    static urlPrefix = "https://www.doublewb.xyz/hci"
    static instance = null;

    static getInstance() { 
        if (BackendService.instance === null) { 
            BackendService.instance = new BackendService()
        }

        return this.instance;
    }

    async getRoomInfo(roomCode) { 
        return fetch(BackendService.urlPrefix + `/rooms/${roomCode}`)
        .then(response => response.json())
    }

    async createNewRoom(newRoom) { 
        return fetch(BackendService.urlPrefix + "/rooms/", {
            method: "post",
            body: JSON.stringify(newRoom),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => { 
            response.clone().json();
        })
    }

    async joinRoom(room) { 
        return fetch(BackendService.urlPrefix + "/join_room", {
            method: "post",
            body: JSON.stringify(room),
            headers: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async createItem(item) { 
        return fetch(BackendService.urlPrefix + "/items", {
            method: "post", 
            body: JSON.stringify(item),
            headers: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async updateItem(item) { 
        return fetch(BackendService.urlPrefix + "/items", {
            method: "put",
            body: JSON.stringify(item),
            headers: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async addParticipation(item) { 
        return fetch(BackendService.urlPrefix + "/amounts", {
            method: "post", 
            body: JSON.stringify(item),
            headers: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async updateParticipation(item) { 
        return fetch(BackendService.urlPrefix + "/amounts", {
            method: "put",
            body: JSON.stringify(item),
            header: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async removeParticipation(item) { 
        return fetch(BackendService.urlPrefix + "/amounts", {
            method: "delete", 
            body: JSON.stringify(item),
            header: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }

    async getBill(user, roomcode) { 
        return fetch(BackendService.urlPrefix + `/bill/user/${user}/room/${roomcode}`).then(response => response.json())
    }

    async userFinished(user) { 
        return fetch(BackendService.urlPrefix + "/finished", {
            method: "post", 
            body: JSON.stringify(user),
            header: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }
}