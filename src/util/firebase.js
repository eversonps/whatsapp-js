export class Firebase{
    constructor(){
        this.config = {

            apiKey: "AIzaSyB-ozC0bbhE5FrHul2YPB4dkJwtczkUkOY",
        
            authDomain: "whatsapp-clone-184e9.firebaseapp.com",
        
            projectId: "whatsapp-clone-184e9",
        
            storageBucket: "whatsapp-clone-184e9.appspot.com",
        
            messagingSenderId: "936521930391",
        
            appId: "1:936521930391:web:b663546b9c6ad9e8adbbd2",
        
            measurementId: "G-6HB4S0S334"
        
          };
        
        
        this.init()

    }

    init(){
        if(this.initialize == "false"){
            firebase.initializeApp(this._config);
            firebase.firestore().setting({
                timestampsInSnapshot: true
            })
            this.initialize = true
        }
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }

    initAuth(){
        return new Promise((s, f)=>{
            let provider = new firebase.auth.GoogleAuthProvider()
            console.log(firebase)
            firebase.auth().Auth().signInWithPopup(provider).then((result)=>{
                let token = result.credential.accessToken
                let user = result.user
                s(user, token)
            }).catch(e=>{
                f(e)
            })
        })
    }
    
}



