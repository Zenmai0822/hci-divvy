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
        return fetch(BackendService.urlPrefix = `/rooms`, {
            method: "get",
            body: JSON.stringify({ "roomCode": roomCode }),
            headers: {"content-type": "application/json"}
        })
        .then(response => response.json())
    }
}