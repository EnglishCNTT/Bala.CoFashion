import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createSvgIcon } from '@mui/material/utils';
import Button from '@mui/material/Button';
const Success = () => {
    const location = useLocation();
    console.log(location)
    const Container = styled.div`
        width:450px;
        height:500px;
        display:flex;
        flex-direction:column;
        align-items:center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
    `;
    
    
    return (
        <Container>
            <CheckCircleIcon color="success" sx={{ fontSize: 100 }}/>
            
            <h1>Payment Done!</h1>
            <p>Thank you for your purchase!</p>
            <p> Have a great day!</p>
            <Link to="/">
            <Button variant="contained" color="success" style={{marginTop:20}}>Go Back</Button>
            </Link>
            
        </Container>
    )
}
           

export default Success