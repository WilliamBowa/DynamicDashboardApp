import axios from "axios";

const getData = () => {

    alert("dataservice");
    
    var url = "https://jsonplaceholder.typicode.com/";

    var res = axios.get(url).then(res => console.log(res));

    return res;

}

export default getData;