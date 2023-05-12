import http from "../http-common";
class contactService{
    async contact(data){
        return await http.post("/api/contact/contact", data)
    }    
    
}
export default new contactService;