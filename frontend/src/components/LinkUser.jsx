import { Link } from "react-router-dom";

function LinkUser ({user, color})
{
    return (
       <Link to={`/Profile/${user}`} className={color}>{user}</Link >
    );
}

export default LinkUser;