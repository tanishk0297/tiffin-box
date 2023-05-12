import http from "../http-common";
class bookingService{
    async book(data){
        return await http.post("/api/booking/book", data)
    }    
    
}
export default new bookingService;