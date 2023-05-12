import http from "../http-common";
class UserService{
    async Register(data){
        return await http.post("/api/users/register", data)
    }    
    async Login(data){
        return await http.post("/api/users/login", data)
    }    
    async Activate(data){
        return await http.post("/api/users/activate", data)
    }    
    async Duplicate(data){
        return await http.post("/api/users/duplicateid", data)
    }    
}
export default new UserService;