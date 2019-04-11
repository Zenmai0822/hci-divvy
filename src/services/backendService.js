export default class BackendService { 

    static urlPrefix = "http://http://www.doublewb.xyz/hci"
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
        return fetch(BackendService.urlPrefix + "/join_room/", {
            method: "post",
            body: JSON.stringify(room),
            headers: {"content-type": "application/json"}
        }).then(response => { 
            response.clone().json();
        })
    }
}